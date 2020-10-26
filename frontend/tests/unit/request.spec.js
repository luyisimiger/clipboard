import { mockService } from '../../public/mockCall';

describe('Fetching data from mock service', () => {
   test('Revisar que la promesa del servicio me está regresando los datos que quiero', () => {
        const res = mockService();    
        const data = {
            mock: [
                {
                    uuid: "31x",
                    text: "Esto es un unit test hecha con jest"
        
                }
            ]
        }

        expect.assertions(1);
        expect(Promise.resolve(res)).resolves.toStrictEqual(data);
   });
});