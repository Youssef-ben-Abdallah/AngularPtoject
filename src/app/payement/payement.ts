import { User } from "../authentification/user"


export class Payement {
    amount: Number
    client: User
    paymentDate?: Date
    paymentId?: number
    cardHolderName: string
    creditCardNumber: string
    cvv: string
    expirationDate: string
    invoices:[]
}
