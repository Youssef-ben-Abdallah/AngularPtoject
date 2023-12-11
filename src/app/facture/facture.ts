import { User } from "../authentification/user"
import { Products } from "../products/products"

export class Facture {
    invoiceId:number
    payer:boolean
    amount:number
    totalHT:number
    tva:number
    client :User
    dateFacture:Date
    produit :Products[]
    qte : number[]
}
