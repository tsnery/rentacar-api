import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { DataSource } from "typeorm";
import { randomUUID } from 'node:crypto'
import { hash } from "bcryptjs";
import request from 'supertest';

import { initializeDatabase } from "@shared/infra/typeorm";
import { app } from "@shared/infra/http/app";

let connection: DataSource

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await initializeDatabase()
    await connection.runMigrations()

    const id = randomUUID()
    const password = await hash("admin", 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, driver_license, password, is_admin, created_at)
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [id, 'Tainan Admin', 'admin@email.com', '123123', password, true, new Date()]
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.destroy()
  })

  it('should be able to create a new category', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin'
    })

    const token = String(authResponse.body.token)

    const response = await request(app).post('/categories').send({
      name: 'Name Supertest',
      description: 'Description Supertest'
    }).set({
      Authorization: `Bearer ${token}`
    })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new category with the same name', async () => {
    const authResponse = await request(app).post('/sessions').send({
      email: 'admin@email.com',
      password: 'admin'
    })

    const token = String(authResponse.body.token)

    const response = await request(app).post('/categories').send({
      name: 'Name Supertest',
      description: 'Description Supertest'
    }).set({
      Authorization: `Bearer ${token}`
    })

    expect(response.status).toBe(400)
  })

  it('should be able to list all categories', async () => {
    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
    expect(response.body).length(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('Name Supertest')

  })
})