import { Expose } from "class-transformer"

export class ReadSpecialtyDto {
    @Expose()
    id: number
    @Expose()
    name: string
}