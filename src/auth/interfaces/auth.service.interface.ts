import { LoginDto } from "../dtos/login.dto";
import { TokenDto } from "../dtos/token.dto";

export interface IAuthService {
    singInAsync(loginDto : LoginDto) : Promise<TokenDto>;
}