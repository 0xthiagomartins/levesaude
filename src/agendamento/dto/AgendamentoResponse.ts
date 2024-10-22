export interface AgendamentoResponse {
    mensagem: string;
    agendamento: {
        medico: string;
        paciente: string;
        data_horario: string;
    };
}
