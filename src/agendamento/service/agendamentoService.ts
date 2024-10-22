import { AgendamentoPayload } from '../dto/AgendamentoPayload';
import { AgendamentoResponse } from '../dto/AgendamentoResponse';
import { medicos } from '../mocks/medicosMock';

export const createAgendamento = (payload: AgendamentoPayload): AgendamentoResponse => {
    const medico = medicos.find(m => m.id === payload.medico_id);
    if (!medico) {
        const error: any = new Error('Médico não encontrado.');
        error.statusCode = 404;
        throw error;
    }

    if (!medico.horarios_disponiveis.includes(payload.data_horario)) {
        const error: any = new Error('Horário indisponível.');
        error.statusCode = 400;
        throw error;
    }

    medico.horarios_disponiveis = medico.horarios_disponiveis.filter(h => h !== payload.data_horario);

    return {
        mensagem: 'Agendamento realizado com sucesso',
        agendamento: {
            medico: medico.nome,
            paciente: payload.paciente_nome,
            data_horario: payload.data_horario,
        },
    };
};
