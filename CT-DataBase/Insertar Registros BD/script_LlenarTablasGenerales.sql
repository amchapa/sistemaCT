-- *****************************************************
-- Entidad Registro de Pais [PAIS]
-- *****************************************************


-- AUTO INCREMENT

INSERT INTO `pais` (`PAISCODIGO`, `PAISNOMBRE`) VALUES
(1, 'PERU'),
(2, 'EEUU'),
(3, 'COLOMBIA'),
(4, 'ECUADOR'),
(5, 'COSTA RICA');

-- *****************************************************
-- Entidad Registro de Provincia [PROV]
-- *****************************************************

-- AUTO INCREMENT

INSERT INTO `provincia` (`PROVCODIGO`, `PROVNOMBRE`, `PAISCODIGO`) VALUES
(1, 'BARRANCA', 1),
(2, 'CAJATAMBO', 1),
(3, 'CANTA', 1),
(4, 'CAÑETE', 1),
(5, 'HUARAL', 1),
(6, 'HUAROCHIRI', 1),
(7, 'HUAURA', 1),
(8, 'LIMA', 1),
(9, 'OYON', 1),
(10, 'YAUYOS', 1),
(11, 'CALLAO', 1),
(12, 'ANCASH', 1),
(13, 'EEUU', 2),
(14, 'COSTA RICA', 5),
(15, 'AREQUIPA', 1),
(16, 'UCAYALI', 1),
(17, 'ICA', 1),
(18, 'CUZCO', 1),
(19, 'LORETO', 1);


-- *****************************************************
-- Entidad Registro de Distrito [DISTR] 
-- *****************************************************

-- AUTO INCREMENT

INSERT INTO `distrito` (`DISTRCODIGO`, `DISTRNOMBRE`, `PROVCODIGO`) VALUES
(1, 'BARRANCA', 1),
(2, 'PARAMONGA', 1),
(3, 'PATIVILCA', 1),
(4, 'SUPE', 1),
(5, 'SUPE PUERTO', 1),
(6, 'CAJATAMBO', 2),
(7, 'COPA', 2),
(8, 'GORPOR', 2),
(9, 'HUANCAPON', 2),
(10, 'MANAS', 2),
(11, 'ARAHUAY', 3),
(12, 'CANTA', 3),
(13, 'HUAMANTANGA', 3),
(14, 'HUAROS', 3),
(15, 'LACHAQUI', 3),
(16, 'SAN BUENAVENTURA', 3),
(17, 'SANTA ROSA DE QUIVES', 3),
(18, 'ASIA', 4),
(19, 'CALANGO', 4),
(20, 'CERRO AZUL', 4),
(21, 'CHILCA', 4),
(22, 'COAYLLO', 4),
(23, 'IMPERIAL', 4),
(24, 'LUNAHUANA', 4),
(25, 'MALA', 4),
(26, 'NUEVO IMPERIAL', 4),
(27, 'PACARAN', 4),
(28, 'QUILMANA', 4),
(29, 'SAN ANTONIO', 4),
(30, 'SAN LUIS', 4),
(31, 'SAN VICENTE DE CAÑETE', 4),
(32, 'SANTA CRUZ DE FLORES', 4),
(33, 'ZUÑIGA', 4),
(34, 'ATAVILLOS ALTO', 5),
(35, 'ATAVILLOS BAJO', 5),
(36, 'AUCALLAMA', 5),
(37, 'CHANCAY', 5),
(38, 'HUARAL', 5),
(39, 'IHUARI', 5),
(40, 'LAMPIAN', 5),
(41, 'PACARAOS', 5),
(42, 'SAN MIGUEL DE  ACOS', 5),
(43, 'SANTA CRUZ DE ANDAMARCA', 5),
(44, 'SUMBILCA', 5),
(45, 'VEINTISIETE DE NOVIEMBRE', 5),
(46, 'ANTIOQUIA', 6),
(47, 'CALLAHUANCA', 6),
(48, 'CARAMPOMA', 6),
(49, 'CHICLA', 6),
(50, 'CUENCA', 6),
(51, 'HUACHUPAMPA', 6),
(52, 'HUANZA', 6),
(53, 'HUAROCHIRI', 6),
(54, 'LAHUAYTAMBO', 6),
(55, 'LANGA', 6),
(56, 'LARAOS', 6),
(57, 'MARIATANA', 6),
(58, 'MATUCANA', 6),
(59, 'RICARDO PALMA', 6),
(60, 'SAN ANDRES DE TUPICOCHA', 6),
(61, 'SAN ANTONIO DE HUAROCHIRI', 6),
(62, 'SAN BARTOLOME', 6),
(63, 'SAN DAMIAN', 6),
(64, 'SAN JUAN DE IRIS', 6),
(65, 'SAN JUAN DE TANTARANCHE', 6),
(66, 'SAN LORENZO DE QUINTI', 6),
(67, 'SAN MATEO', 6),
(68, 'SAN MATEO DE OTAO', 6),
(69, 'SAN PEDRO DE CASTA', 6),
(70, 'SAN PEDRO DE HUANCAYRE', 6),
(71, 'SANGALLAYA', 6),
(72, 'SANTA CRUZ DE COCACHACRA', 6),
(73, 'SANTA EULALIA', 6),
(74, 'SANTIAGO DE ANCHUCAYA', 6),
(75, 'SANTIAGO DE TUNA', 6),
(76, 'SANTO DOMINGO DE LOS OLLEROS', 6),
(77, 'SURCO', 6),
(78, 'AMBAR', 7),
(79, 'CALETA DE CARQUIN', 7),
(80, 'CHECRAS', 7),
(81, 'HUACHO', 7),
(82, 'HUALMAY', 7),
(83, 'HUAURA', 7),
(84, 'LEONCIO PRADO', 7),
(85, 'PACCHO', 7),
(86, 'SANTA LEONOR', 7),
(87, 'SANTA MARIA', 7),
(88, 'SAYAN', 7),
(89, 'VEGUETA', 7),
(90, 'ANCON ', 8),
(91, 'ATE', 8),
(92, 'BARRANCO', 8),
(93, 'BREÑA', 8),
(94, 'CARABAYLLO', 8),
(95, 'CHACLACAYO', 8),
(96, 'CHORRILLOS', 8),
(97, 'CIENEGUILLA', 8),
(98, 'COMAS', 8),
(99, 'EL AGUSTINO', 8),
(100, 'INDEPENDENCIA', 8),
(101, 'JESUS MARIA', 8),
(102, 'LA MOLINA', 8),
(103, 'LA VICTORIA', 8),
(104, 'LIMA', 8),
(105, 'LINCE ', 8),
(106, 'LOS OLIVOS', 8),
(107, 'LURIGANCHO-CHOSICA', 8),
(108, 'LURIN', 8),
(109, 'MAGDALENA DEL MAR', 8),
(110, 'MIRAFLORES', 8),
(111, 'PACHACAMAC', 8),
(112, 'PUCUSANA', 8),
(113, 'PUEBLO LIBRE', 8),
(114, 'PUENTE PIEDRA', 8),
(115, 'PUNTA HERMOSA', 8),
(116, 'PUNTA NEGRA', 8),
(117, 'RIMAC', 8),
(118, 'SAN BARTOLO', 8),
(119, 'SAN BORJA', 8),
(120, 'SAN ISIDRO', 8),
(121, 'SAN JUAN DE LURIGANCHO', 8),
(122, 'SAN JUAN DE MIRAFLORES', 8),
(123, 'SAN LUIS-LIMA', 8),
(124, 'SAN MARTIN DE PORRES', 8),
(125, 'SAN MIGUEL', 8),
(126, 'SANTA ANITA', 8),
(127, 'SANTA MARIA DEL MAR', 8),
(128, 'SANTA ROSA', 8),
(129, 'SANTIAGO DE SURCO', 8),
(130, 'SURQUILLO', 8),
(131, 'VILLA EL SALVADOR', 8),
(132, 'VILLA MARIA DEL TRIUNFO', 8),
(133, 'ANDAJES', 9),
(134, 'CAUJUL', 9),
(135, 'COCHAMARCA', 9),
(136, 'NAVAN', 9),
(137, 'OYON', 9),
(138, 'PACHANGARA', 9),
(139, 'ALIS', 10),
(140, 'AYAUCA', 10),
(141, 'AYAVIRI', 10),
(142, 'AZANGARO', 10),
(143, 'CACRA', 10),
(144, 'CARANIA', 10),
(145, 'CATAHUASI', 10),
(146, 'CHOCOS', 10),
(147, 'COCHAS', 10),
(148, 'COLONIA', 10),
(149, 'HONGOS', 10),
(150, 'HUAMPARA', 10),
(151, 'HUANCAYA', 10),
(152, 'HUAÑEC', 10),
(153, 'HUANGASCAR', 10),
(154, 'HUANTAN', 10),
(155, 'LARAOS-YAUYOS', 10),
(156, 'LINCHA', 10),
(157, 'MADEAN', 10),
(158, 'MIRAFLORES-YAUYOS', 10),
(159, 'OMAS ', 10),
(160, 'PUTINZA', 10),
(161, 'QUINCHES', 10),
(162, 'QUINOCAY', 10),
(163, 'SAN JOAQUIN', 10),
(164, 'SAN PEDRO DE PILAS', 10),
(165, 'TANTA', 10),
(166, 'TAURIPAMPA', 10),
(167, 'TOMAS', 10),
(168, 'TUPE', 10),
(169, 'VIÑAC', 10),
(170, 'VITIS', 10),
(171, 'YAUYOS', 10),
(172, 'BELLAVISTA', 11),
(173, 'CALLAO', 11),
(174, 'CARMEN DE LA LEGUA REYNOSO', 11),
(175, 'LA PERLA', 11),
(176, 'LA PUNTA', 11),
(177, 'MI PERU', 11),
(178, 'VENTANILLA', 11),
(179, 'HUARAZ', 12),
(180, 'EEUU', 13),
(181, 'COSTA RICA', 14),
(182, 'AREQUIPA', 15),
(183, 'PUCALLPA', 16),
(184, 'ICA', 17),
(185, 'CUZCO', 18),
(186, 'IQUITOS', 19);


-- *****************************************************
-- Entidad de Tipo de Estado  [EST]
-- *****************************************************


-- AUTO INCREMENT

INSERT INTO `estado` (`ESTCODIGO`, `ESTDESCRIPCION`, `ESTTIPO`) VALUES
(1, 'ACTIVO', 'CLIENTE'),
(2, 'INACTIVO', 'CLIENTE'),
(3, 'MOROSO', 'CLIENTE-INHABILITADO'),
(4, 'ACTIVO', 'EMPRESA'),
(5, 'INACTIVO', 'EMPRESA'),
(6, 'ACTIVO', 'BANCO'),
(7, 'INACTIVO', 'BANCO'),
(8, 'ACTIVO', 'PERSONAL'),
(9, 'INACTIVO', 'PERSONAL'),
(10, 'ACTIVO', 'MAQUINA'),
(11, 'INACTIVO', 'MAQUINA'),
(12, 'ACTIVO', 'USUARIO'),
(13, 'INACTIVO', 'USUARIO'),
(14, 'POR APROBAR', 'PRESUPUESTO'),
(15, 'ACEPTADO', 'PRESUPUESTO'),
(16, 'PRODUCCION', 'PRESUPUESTO'),
(17, 'FACTURADO', 'PRESUPUESTO'),
(18, 'ANULADO', 'PRESUPUESTO'),
(19, 'ABIERTA', 'ORDEN DE PRODUCCION'),
(20, 'PREFACTURADA', 'ORDEN DE PRODUCCION'),
(21, 'ENTREGADA', 'ORDEN DE PRODUCCION'),
(22, 'FACTURADA', 'ORDEN DE PRODUCCION'),
(23, 'BOLETA', 'ORDEN DE PRODUCCION'),
(24, 'CANCELADA ', 'ORDEN DE PRODUCCION'),
(25, 'LETRA', 'ORDEN DE PRODUCCION'),
(26, 'ANULADA', 'ORDEN DE PRODUCCION'),
(27, 'STAND BY', 'ORDEN DE PRODUCCION'),
(28, 'REEMPLAZADO', 'ORDEN DE PRODUCCION'),
(29, 'EMITIDA', 'GUIA'),
(30, 'ANULADA', 'GUIA'),
(31, 'PENDIENTE', 'RECIBO CAJA'),
(32, 'RENDIDO', 'RECIBO CAJA'),
(33, 'ANULADO', 'RECIBO CAJA'),
(34, 'CANCELACIONES', 'ARQUEO CAJA'),
(35, 'ADELANTOS', 'ARQUEO CAJA'),
(36, 'DEVOLUCIONES', 'ARQUEO CAJA'),
(37, 'PROTESTADA', 'GENERACION LETRA'),
(38, 'ACEPTADA', 'GENERACION LETRA'),
(39, 'ASIGNADA', 'GENERACION LETRA'),
(40, 'REEMPLAZADA', 'GENERACION LETRA'),
(41, 'PENDIENTE', 'IMPRIMIR PLANILLA'),
(42, 'CANCELADO', 'IMPRIMIR PLANILLA'),
(43, 'PENDIENTE', 'BANCO SIN CANCELAR'),
(44, 'CANCELADO', 'BANCO SIN CANCELAR'),
(45, 'ACTIVO', 'SERVICIO'), 
(46, 'INACTIVO', 'SERVICIO'),
(47, 'PERIODO', 'CONTRATO'),
(48, 'INDEFINIDO', 'CONTRATO'),
(49, 'EFECTIVAS', 'VACACIONES'),
(50, 'COMPENSADAS', 'VACACIONES'),
(51, 'PROGRAMADAS', 'VACACIONES');


-- *****************************************************
-- Entidad Registro de Tipo de Area  [AREA]
-- *****************************************************


INSERT INTO `area` (`AREACODIGO`, `AREADESCRIPCION`) VALUES 
('A1', 'ACABADOS'),
('A2', 'ADMINISTRATIVOS'),
('A3', 'COORDINADORES'),
('A4', 'EJECUTIVOS'),
('A5', 'IMPRESION'),
('A6', 'MENSAJERIA Y MANTENIMIENTO'),
('A7', 'PREPRENSA'),
('A8', 'SISTEMAS');



-- *****************************************************
-- Entidad Registro de Familia  [FAM]
-- *****************************************************


INSERT INTO `familia` (`FAMCODIGO`, `FAMDESCRIPCION`) VALUES 
('F2', 'IMPRESION DIGITAL'),
('F3', 'PRE PRENSA DIGITAL'),
('F4', 'VENTAS');


-- *****************************************************
-- Entidad Registro de Sub Familia  [SUBFAM]
-- *****************************************************


INSERT INTO `sub_familia` (`SUBFAMCODIGO`, `SUBFAMDESCRIPCION`,`FAMCODIGO`) VALUES 
('SF6', 'IMPRENTA','F2'),
('SF7', 'LASER B/N','F3'),
('SF8', 'CANSON','F3'),
('SF9', 'PLOTTER','F3'),
('SF10', 'CHROMAX','F3'),
('SF11', 'LASER COLOR','F3'),
('SF12', 'RAINBOW','F3'),
('SF13', 'COLOCADO/CAMBIO/DIGRAMACION/ARMADO','F3'),
('SF14', 'COPIA INFORMACION','F3'),
('SF15', 'OTROS','F3'),
('SF16', 'PELICULA','F3'),
('SF17', 'FOTOMONTAJE','F3'),
('SF18', 'MATCH PRINT','F3'),
('SF19', 'PAPEL FOTOGRAFICO','F3'),
('SF20', 'MENSAJERIA','F3'),
('SF21', 'POSCRIPT','F3'),
('SF22', 'ACCESORIOS. TARJETAS DE RED. MODEMS','F4'), 
('SF23', 'BERNOULLY. CD-ROM Y DERIVADOS','F4'),
('SF24', 'PANTONERA','F4'),
('SF25', 'SOFTWARE Y KITS MULTIMEDIA','F4'),
('SF26', 'DISCO DURO','F4'),
('SF27', 'IMPRESORAS Y SCANNERS','F4'),
('SF28', 'ZIP','F4'),
('SF29', 'JAZ','F4'),
('SF30', 'MONITOR','F4'),
('SF31', 'PCS','F4'),
('SF32', 'TINTAS','F4'),
('SF33', 'TONER','F4'),
('SF34', 'BANDEJAS','F4'),
('SF35', 'SERVICIO TECNICO','F4'),
('SF36', 'OTROS','F4');
 

-- *****************************************************
-- Entidad Registro de Tipo de Impresion  [TIPIMPRE]
-- *****************************************************

/*
INSERT INTO `tipo_impresion` (`TIPIMPRECODIGO`, `TIPIMPREDESCRIPCION`) VALUES 
('T01', 'AFICHE'),
('T02', 'BANDERINES'),
('T03', 'BLOCKS'),
('T04', 'BROCHURE'),
('T05', 'BOLSA'),
('T06', 'CAJA'),
('T07', 'CATALOGO'),
('T08', 'CARTA'),
('T09', 'CARPETA'),
('T10', 'COLGANTE'),
('T11', 'CUADRIPTICO'),
('T12', 'CUADERNOS'),
('T13', 'CUPON'),
('T14', 'DIPLOMA'),
('T15', 'DIPTICO'),
('T16', 'ETIQUETA'),
('T17', 'FOLLETO'),
('T18', 'HOJA'),
('T19', 'LIBRO'),
('T20', 'LITERATURA'),
('T21', 'MANUAL'),
('T22', 'MEMORIA'),
('T23', 'REVISTA'),
('T24', 'SECANTE'),
('T25', 'SOBRES'),
('T26', 'STCIKERS'),
('T27', 'TARJETA'),
('T28', 'TRIPTICO'),
('T29', 'VOLANTE');
 */
 
 
 -- *****************************************************
-- Entidad Registro de Tipo de Acabado  [TIPACAB]
-- *****************************************************

-- FALTA EL COSTO

INSERT INTO `tipo_acabado` (`TIPACABCODIGO`, `TIPACABNOMBRE`, `TIPACABCOSTO`) VALUES 
('TIA01', 'ACABADOS-EXTRA', 0),
('TIA02', 'ALCE', 0),
('TIA03', 'BARNIZADO', 0),
('TIA04', 'CONTADO', 0),
('TIA05', 'CONTRAPLACADO', 0),
('TIA06', 'CORTE', 0),
('TIA07', 'DESGLOSADO', 0),
('TIA08', 'DOBLEZ', 0),
('TIA09', 'EMPAQUETADO', 0),
('TIA10', 'ENCOLADO', 0),
('TIA11', 'ENGRAPADO', 0),
('TIA12', 'FAJILLADO', 0),
('TIA13', 'IMPRESION', 0),
('TIA14', 'MANO-OBRA', 0),
('TIA15', 'NUMERADO', 0),
('TIA16', 'OTROS', 0),
('TIA17', 'PEGADO', 0),
('TIA18', 'PLACAS', 0),
('TIA19', 'PLASTIFICADO', 0),
('TIA20', 'PREPRENSA', 0),
('TIA21', 'SUPERVISION', 0),
('TIA22', 'TINTA', 0),
('TIA23', 'TROQUELADO', 0);
 
 
-- *****************************************************
-- Entidad Registro de Area de Maquina  [AREAMAQ]
-- *****************************************************


INSERT INTO `area_maquina` (`AREAMAQCODIGO`, `AREAMAQDESCRIPCION`) VALUES 
('TIM01', 'BARNIZADO'),
('TIM02', 'CONTRAPLACADO'),
('TIM03', 'CORTE'),
('TIM04', 'DOBLES'),
('TIM05', 'ENCOLADO'),
('TIM06', 'ENGRAPADO'),
('TIM07', 'IMPRESION'),
('TIM08', 'NUMERADO'),
('TIM09', 'PLASTIFICADO'),
('TIM10', 'PREPRENSA'),
('TIM11', 'TROQUELADO'),
('TIM12', 'OTROS');



