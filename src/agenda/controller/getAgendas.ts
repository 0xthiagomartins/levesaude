import { APIGatewayProxyHandler } from 'aws-lambda';
import { getAgendas } from '../service/agendaService';

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const data = getAgendas();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ mensagem: 'Erro ao buscar agendas.' }),
        };
    }
};
