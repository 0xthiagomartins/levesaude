import { APIGatewayProxyHandler } from 'aws-lambda';
import { createAgendamento } from '../service/agendamentoService';
import { AgendamentoPayload } from '../dto/AgendamentoPayload';
import Joi from 'joi';

const agendamentoSchema = Joi.object({
    medico_id: Joi.number().required(),
    paciente_nome: Joi.string().required(),
    data_horario: Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/).required(),
});

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const payload: AgendamentoPayload = JSON.parse(event.body || '{}');

        const { error } = agendamentoSchema.validate(payload);
        if (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ mensagem: `Payload inválido: ${error.message}` }),
            };
        }

        const response = createAgendamento(payload);
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (error: any) {
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ mensagem: error.message || 'Erro ao criar agendamento.' }),
        };
    }
};
