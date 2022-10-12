import { resolve } from "path"
import { unlink } from 'fs'

export default {
  remove(folder: string, filename: string) {
    const filePath = resolve(__dirname, "..", "..", folder)
    unlink(`${filePath}/${filename}`, (err) => {
      if (err) throw new Error('It as not possible to remove file')
      console.log(`${filename} was deleted!`)
    })
  }
}