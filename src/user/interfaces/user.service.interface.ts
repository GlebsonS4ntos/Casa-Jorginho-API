export interface IUserService {
    getUserByCpfAsync(cpf : string) : Promise<void>;
}