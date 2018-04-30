import Matrix from './modules/matrix.js'
import '../css/main.style.scss'



let data_one = [
    [1, 1],
    [1, 1]
]

let data_two = [
    [1, 1],
    [1, 1],
]

let m1 = new Matrix(data_one)
let m2 = new Matrix(data_two)




let m3 = Matrix.add(m1, m2)
let m4 = Matrix.add(m3, 10)


Matrix.print(m4)