-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-04-2022 a las 12:54:53
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pickit`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autos`
--

CREATE TABLE `autos` (
  `id_auto` int(11) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `anio` date NOT NULL,
  `patente` varchar(10) NOT NULL,
  `color` varchar(30) NOT NULL,
  `rela_propietario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `autos`
--

INSERT INTO `autos` (`id_auto`, `marca`, `modelo`, `anio`, `patente`, `color`, `rela_propietario`) VALUES
(2, 'Mercedes Benz', 'Model1', '0000-00-00', 'AA111AA', 'Gris', 5),
(3, 'Toyota', 'Corolla', '0000-00-00', 'AA111AB', 'Azul', 5),
(4, 'Toyota', 'Hilux', '0000-00-00', 'AA111AB', 'Rojo', 5),
(5, 'Toyota', 'Hilux', '0000-00-00', 'AA111AD', 'Gris', 4),
(6, 'Honda', 'CRV', '0000-00-00', 'AA111AE', 'Gris', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_ordenes`
--

CREATE TABLE `detalle_ordenes` (
  `id_detalle` int(11) NOT NULL,
  `rela_orden` int(11) NOT NULL,
  `rela_servicio` int(11) NOT NULL,
  `importe` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_ordenes`
--

CREATE TABLE `estados_ordenes` (
  `id_estado` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estados_ordenes`
--

INSERT INTO `estados_ordenes` (`id_estado`, `descripcion`) VALUES
(1, 'Abierta'),
(2, 'Confirmada'),
(3, 'Cerrada'),
(5, 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE `ordenes` (
  `id_orden` int(11) NOT NULL,
  `rela_auto` int(11) NOT NULL,
  `rela_estado` int(11) NOT NULL DEFAULT 1,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ordenes`
--

INSERT INTO `ordenes` (`id_orden`, `rela_auto`, `rela_estado`, `fecha`, `total`) VALUES
(5, 2, 1, '2022-04-10', 0),
(6, 3, 1, '2022-04-10', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propietario`
--

CREATE TABLE `propietario` (
  `id_propietario` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `propietario`
--

INSERT INTO `propietario` (`id_propietario`, `nombre`, `apellido`) VALUES
(4, 'Mirtha', 'Tomassi'),
(5, 'Nicolás Federico', 'Leguizamón Tomassi'),
(6, 'Nicolás F.', 'Leguizamón T.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_servicio` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `importe` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id_servicio`, `descripcion`, `importe`) VALUES
(2, 'Cambio de aceite', 100),
(3, 'Cambio de filtro', 150),
(4, 'Cambio de correa', 200),
(5, 'Revisión general', 200),
(6, 'Pintura', 100),
(7, 'Otro', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autos`
--
ALTER TABLE `autos`
  ADD PRIMARY KEY (`id_auto`),
  ADD KEY `fk_autos_propietarios` (`rela_propietario`);

--
-- Indices de la tabla `detalle_ordenes`
--
ALTER TABLE `detalle_ordenes`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `fk_detalle_ordenes` (`rela_orden`),
  ADD KEY `fk_detalle_ordenes_servicios` (`rela_servicio`);

--
-- Indices de la tabla `estados_ordenes`
--
ALTER TABLE `estados_ordenes`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD PRIMARY KEY (`id_orden`),
  ADD KEY `fk_ordenes_autos` (`rela_auto`),
  ADD KEY `fk_ordenes_estados` (`rela_estado`);

--
-- Indices de la tabla `propietario`
--
ALTER TABLE `propietario`
  ADD PRIMARY KEY (`id_propietario`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_servicio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autos`
--
ALTER TABLE `autos`
  MODIFY `id_auto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `detalle_ordenes`
--
ALTER TABLE `detalle_ordenes`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estados_ordenes`
--
ALTER TABLE `estados_ordenes`
  MODIFY `id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  MODIFY `id_orden` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `propietario`
--
ALTER TABLE `propietario`
  MODIFY `id_propietario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `autos`
--
ALTER TABLE `autos`
  ADD CONSTRAINT `fk_autos_propietarios` FOREIGN KEY (`rela_propietario`) REFERENCES `propietario` (`id_propietario`);

--
-- Filtros para la tabla `detalle_ordenes`
--
ALTER TABLE `detalle_ordenes`
  ADD CONSTRAINT `fk_detalle_ordenes` FOREIGN KEY (`rela_orden`) REFERENCES `ordenes` (`id_orden`),
  ADD CONSTRAINT `fk_detalle_ordenes_servicios` FOREIGN KEY (`rela_servicio`) REFERENCES `servicios` (`id_servicio`);

--
-- Filtros para la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD CONSTRAINT `fk_ordenes_autos` FOREIGN KEY (`rela_auto`) REFERENCES `autos` (`id_auto`),
  ADD CONSTRAINT `fk_ordenes_estados` FOREIGN KEY (`rela_estado`) REFERENCES `estados_ordenes` (`id_estado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
