import { IServices } from 'soap';
import { SoapCallbackFunction } from '../types/SoapCallbackFunction';
import * as authServiceBase from '../../services/auth.service';


export const authServiceSoap: IServices = {
  AuthService: {
    AuthServicePort: {
      Login: async function ({ email, password }: { email: string, password: string }, callback: SoapCallbackFunction) {
              if (!callback) return;
              const { token, isAuthenticated }: { token: string | null; isAuthenticated: boolean } = await authServiceBase.login(
                  email,
                  password,
                );
                if(isAuthenticated && token) callback({ token });
                return callback({
                  Fault: {
                    faultcode: 'soap:Client',
                    faultstring: `Error Login`,
                    detail: {
                      code: 500,
                      message: `Error Login`,
                    },
                  },
                });

            },
    }
  }
}
