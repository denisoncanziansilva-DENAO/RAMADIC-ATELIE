-- ============================================================================
-- DADOS INICIAIS (SEED) CONSISTENTES COM O FRONTEND - RAMADIC ATELIÊ
-- ============================================================================

DO $$
DECLARE
    v_alfaiataria_id UUID;
    v_prof_helena UUID;
    v_prof_cadu UUID;
    v_prof_ana UUID;
    v_cli_fernanda UUID;
    v_cli_roberto UUID;
    v_cli_juliana UUID;
    v_serv_barra_jeans UUID;
    v_serv_ajuste_cos UUID;
    v_serv_ziper UUID;
    v_serv_manga_camisa UUID;
    v_serv_corpo_camisa UUID;
    v_serv_colarinho UUID;
    v_serv_vestido_busto UUID;
    v_serv_vestido_barra UUID;
    v_serv_vestido_fecho UUID;
    v_serv_paleto_manga UUID;
    v_serv_paleto_ombro UUID;
    v_serv_upcycling UUID;
    v_os_10429 UUID;
    v_item1_id UUID;
    v_item2_id UUID;
BEGIN
    -- 1. Ateliê
    INSERT INTO alfaiataria (nome, email, telefone, cnpj_cpf, endereco)
    VALUES (
        'Ramadic Entre Linhas - Ateliê de Costura',
        'contato@ramadicatelie.com.br',
        '(11) 99999-9999 / (11) 3333-3333',
        '12.345.678/0001-90',
        'Av. Principal, 1200 - Sala 04, Centro, São Paulo - SP'
    )
    ON CONFLICT (email) DO UPDATE SET nome = EXCLUDED.nome
    RETURNING id INTO v_alfaiataria_id;

    -- 2. Profissionais da Equipe
    INSERT INTO profissionais (alfaiataria_id, nome, apelido_bancada, telefone, especialidades, percentual_comissao, ativo)
    VALUES 
    (v_alfaiataria_id, 'Maria Helena Ramadic', 'Dona Helena', '11991112222', ARRAY['ALFAIATARIA', 'VESTIDO_FESTA', 'ALTA_COSTURA'], 20.00, true)
    RETURNING id INTO v_prof_helena;

    INSERT INTO profissionais (alfaiataria_id, nome, apelido_bancada, telefone, especialidades, percentual_comissao, ativo)
    VALUES 
    (v_alfaiataria_id, 'Carlos Eduardo Lima', 'Cadu', '11993334444', ARRAY['JEANS', 'BARRA_ORIGINAL', 'ZIPER', 'REPAROS_RAPIDOS'], 15.00, true)
    RETURNING id INTO v_prof_cadu;

    INSERT INTO profissionais (alfaiataria_id, nome, apelido_bancada, telefone, especialidades, percentual_comissao, ativo)
    VALUES 
    (v_alfaiataria_id, 'Ana Paula Silva', 'Ana', '11995556666', ARRAY['ATENDIMENTO', 'PROVA_BALCAO', 'MEDICAO'], 5.00, true)
    RETURNING id INTO v_prof_ana;

    -- 3. Catálogo de Serviços do Simulador Interativo
    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'calca', 'Barra Original', 35.00, 24) RETURNING id INTO v_serv_barra_jeans;

    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'calca', 'Ajustar Cintura / Gancho', 45.00, 48) RETURNING id INTO v_serv_ajuste_cos;

    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'calca', 'Troca de Zíper Reforçado', 35.00, 24) RETURNING id INTO v_serv_ziper;

    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'camisa', 'Encurtar Mangas com Punho', 50.00, 48) RETURNING id INTO v_serv_manga_camisa;

    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'camisa', 'Ajustar Laterais e Costas', 45.00, 48) RETURNING id INTO v_serv_corpo_camisa;

    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'camisa', 'Virar / Ajustar Colarinho', 40.00, 72) RETURNING id INTO v_serv_colarinho;

    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'vestido', 'Ajuste de Busto e Decote', 90.00, 120) RETURNING id INTO v_serv_vestido_busto;

    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'vestido', 'Barra em Tecido Fino / Cauda', 80.00, 72) RETURNING id INTO v_serv_vestido_barra;

    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'vestido', 'Zíper Invisível / Forro', 50.00, 48) RETURNING id INTO v_serv_vestido_fecho;

    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'paleto', 'Ajuste de Manga de Alfaiataria', 95.00, 96) RETURNING id INTO v_serv_paleto_manga;

    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'paleto', 'Ajustar Ombreira e Costas', 130.00, 120) RETURNING id INTO v_serv_paleto_ombro;

    INSERT INTO servicos_catalogo (alfaiataria_id, categoria, nome_servico, preco_base_sugerido, prazo_padrao_horas) VALUES
    (v_alfaiataria_id, 'customizacao', 'Customização & Upcycling', 65.00, 72) RETURNING id INTO v_serv_upcycling;

    -- 4. Clientes da Base
    INSERT INTO clientes (alfaiataria_id, nome, cpf, telefone, whatsapp, email, endereco_cidade, endereco_uf, observacoes)
    VALUES (
        v_alfaiataria_id,
        'Fernanda Oliveira',
        '123.456.789-00',
        '11999998888',
        '11999998888',
        'fernanda.oliveira@email.com',
        'São Paulo',
        'SP',
        'Cliente assídua. Prefere linha original ocre nas calças Jeans.'
    ) RETURNING id INTO v_cli_fernanda;

    INSERT INTO clientes (alfaiataria_id, nome, cpf, telefone, whatsapp, email, endereco_cidade, endereco_uf, observacoes)
    VALUES (
        v_alfaiataria_id,
        'Roberto Mendes',
        '234.567.890-11',
        '11988887777',
        '11988887777',
        'roberto.mendes@email.com',
        'São Paulo',
        'SP',
        'Ajustes frequentes de camisas sociais e paletós.'
    ) RETURNING id INTO v_cli_roberto;

    INSERT INTO clientes (alfaiataria_id, nome, cpf, telefone, whatsapp, email, endereco_cidade, endereco_uf, observacoes)
    VALUES (
        v_alfaiataria_id,
        'Juliana Costa',
        '345.678.901-22',
        '11977776666',
        '11977776666',
        'juliana.costa@email.com',
        'São Paulo',
        'SP',
        'Madrinha de casamento; vestido em crepe georgette com pedrarias.'
    ) RETURNING id INTO v_cli_juliana;

    -- 5. Ordem de Serviço #10429 (Correspondente à consulta da Landing Page)
    INSERT INTO ordens_servico (
        alfaiataria_id,
        numero_os,
        cliente_id,
        atendente_id,
        prioridade,
        status_geral,
        status_financeiro,
        data_entrada,
        data_prevista_entrega,
        valor_total_servicos,
        valor_total_liquido,
        valor_sinal_pago,
        saldo_devedor_retirada,
        observacoes_balcao
    ) VALUES (
        v_alfaiataria_id,
        10429,
        v_cli_fernanda,
        v_prof_ana,
        'NORMAL',
        'EM_COSTURA',
        'SINAL_PAGO',
        now() - INTERVAL '1 day',
        now() + INTERVAL '1 day',
        80.00,
        80.00,
        40.00,
        40.00,
        'Peça marcada no balcão com calçado de salto 5cm. Linha e pesponto idênticos aos de fábrica.'
    )
    ON CONFLICT (numero_os) DO UPDATE SET status_geral = 'EM_COSTURA'
    RETURNING id INTO v_os_10429;

    -- 6. Itens na Ficha Técnica da OS #10429
    INSERT INTO itens_os (
        ordem_servico_id,
        servico_catalogo_id,
        costureiro_executor_id,
        tipo_peca,
        marca_etiqueta,
        cor_tecido,
        tipo_tecido,
        cor_linha_pesponto,
        tipo_bainha_barra,
        altura_barra_cm,
        avarias_previas,
        status_item,
        valor_unitario,
        comissao_calculada,
        observacao_tecnica_costureiro
    ) VALUES (
        v_os_10429,
        v_serv_barra_jeans,
        v_prof_cadu,
        'Calça Jeans Flare',
        'Levi''s 721',
        'Azul Índigo Médio',
        'Jeans 98% Algodão 2% Elastano',
        'Ocre / Amarelo Mostarda Original nº 36',
        'Barra Original com dobra preservada',
        4.0,
        'Sem avarias prévias. Medido 4cm exatos de dobra no provador com sapato salto 5cm.',
        'EM_COSTURA',
        35.00,
        5.25,
        'Costurando na máquina pespontadeira com linha de alta tenacidade.'
    ) RETURNING id INTO v_item1_id;

    INSERT INTO itens_os (
        ordem_servico_id,
        servico_catalogo_id,
        costureiro_executor_id,
        tipo_peca,
        marca_etiqueta,
        cor_tecido,
        tipo_tecido,
        cor_linha_pesponto,
        tipo_bainha_barra,
        ajuste_cintura_cm,
        avarias_previas,
        status_item,
        valor_unitario,
        comissao_calculada,
        observacao_tecnica_costureiro
    ) VALUES (
        v_os_10429,
        v_serv_ajuste_cos,
        v_prof_cadu,
        'Calça Jeans Flare',
        'Levi''s 721',
        'Azul Índigo Médio',
        'Jeans 98% Algodão 2% Elastano',
        'Ocre / Amarelo Mostarda Original nº 36',
        'Ajuste de cós traseiro sem cortar presilhas',
        3.0,
        'Eliminar sobra de 3cm na curvatura da lombar.',
        'AGUARDANDO_CORTE',
        45.00,
        6.75,
        'Desmanche cuidadoso da etiqueta de couro e costura traseira.'
    ) RETURNING id INTO v_item2_id;

    -- 7. Foto da Peça Vinculada
    INSERT INTO fotos_os (ordem_servico_id, item_os_id, tipo_foto, url_arquivo, descricao_foto)
    VALUES (
        v_os_10429,
        v_item1_id,
        'PROVA_GIZ_ALFINETE',
        '/hero-atelier.jpg',
        'Foto da peça com marcação em giz e alfinete na prova de balcão'
    );

    -- 8. Pagamento de Sinal (50%)
    INSERT INTO pagamentos_os (ordem_servico_id, tipo_transacao, forma, valor_pago, comprovante_transacao_id, recebido_por_id, observacao)
    VALUES (
        v_os_10429,
        'SINAL_ENTRADA',
        'PIX',
        40.00,
        'PIX-RAMADIC-10429-01',
        v_prof_ana,
        'Sinal de 50% pago no momento da prova no balcão'
    );

    -- 9. Histórico de Produção da OS #10429
    INSERT INTO historico_status_os (ordem_servico_id, status_anterior, status_novo, alterado_por_id, descricao_evento, created_at)
    VALUES 
    (v_os_10429, NULL, 'RECEBIDO_PROVA', v_prof_ana, 'Peça provada e demarcada com giz e alfinetes no balcão', now() - INTERVAL '24 hours'),
    (v_os_10429, 'RECEBIDO_PROVA', 'AGUARDANDO_CORTE', v_prof_cadu, 'Peça separada na bancada para corte de linha original', now() - INTERVAL '18 hours'),
    (v_os_10429, 'AGUARDANDO_CORTE', 'EM_COSTURA', v_prof_cadu, 'Etapa 3 de 4 (Costura em máquina pespontadeira com linha de fábrica)', now() - INTERVAL '4 hours');

END $$;
