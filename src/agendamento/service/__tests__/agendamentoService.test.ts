import { createAgendamento } from '../agendamentoService';
import { AgendamentoPayload } from '../../dto/AgendamentoPayload';
import { medicos } from '../../mocks/medicosMock';

describe('Agendamento Service', () => {
    it('should create a new agendamento successfully', () => {
        const payload: AgendamentoPayload = {
            medico_id: 1,
            paciente_nome: 'Carlos Almeida',
            data_horario: '2024-10-05 09:00',
        };

        const response = createAgendamento(payload);

        expect(response).toHaveProperty('mensagem', 'Agendamento realizado com sucesso');
        expect(response.agendamento).toMatchObject({
            medico: 'Dr. João Silva',
            paciente: 'Carlos Almeida',
            data_horario: '2024-10-05 09:00',
        });

        const medico = medicos.find(m => m.id === payload.medico_id);
        expect(medico?.horarios_disponiveis).not.toContain(payload.data_horario);
    });

    it('should throw an error if medico_id is invalid', () => {
        const payload: AgendamentoPayload = {
            medico_id: 999,
            paciente_nome: 'Carlos Almeida',
            data_horario: '2024-10-05 09:00',
        };

        expect(() => createAgendamento(payload)).toThrow('Médico não encontrado.');
    });

    it('should throw an error if data_horario is unavailable', () => {
        const payload: AgendamentoPayload = {
            medico_id: 1,
            paciente_nome: 'Carlos Almeida',
            data_horario: '2024-10-05 08:00',
        };

        expect(() => createAgendamento(payload)).toThrow('Horário indisponível.');
    });
});
