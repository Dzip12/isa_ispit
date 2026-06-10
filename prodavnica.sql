-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.46 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.12.0.7122
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for prodavnica
CREATE DATABASE IF NOT EXISTS `prodavnica` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `prodavnica`;

-- Dumping structure for table prodavnica.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `orders_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'PENDING',
  PRIMARY KEY (`orders_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table prodavnica.orders: ~4 rows (approximately)
INSERT INTO `orders` (`orders_id`, `user_id`, `total_amount`, `status`) VALUES
	(1, 1, 4780.00, 'PAID'),
	(2, 2, 5990.00, 'PENDING'),
	(3, 2, 16260.00, 'PAID'),
	(4, 2, 2990.00, 'PENDING');

-- Dumping structure for table prodavnica.products
CREATE TABLE IF NOT EXISTS `products` (
  `products_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `size` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`products_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table prodavnica.products: ~5 rows (approximately)
INSERT INTO `products` (`products_id`, `name`, `price`, `size`, `image_url`) VALUES
	(1, 'Majica', 1290.00, 'M', 'https://placehold.co/400x300?text=Majica'),
	(2, 'Farmerke', 3490.00, '32', 'https://placehold.co/400x300?text=Farmerke'),
	(3, 'Duks', 2990.00, 'L', 'https://placehold.co/400x300?text=Duks'),
	(4, 'Patike', 5990.00, '42', 'https://placehold.co/400x300?text=Patike'),
	(5, 'Kacket', 990.00, 'UNI', 'https://placehold.co/400x300?text=Kacket');

-- Dumping structure for table prodavnica.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `roles_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`roles_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table prodavnica.roles: ~2 rows (approximately)
INSERT INTO `roles` (`roles_id`, `name`) VALUES
	(1, 'admin'),
	(2, 'user');

-- Dumping structure for table prodavnica.users
CREATE TABLE IF NOT EXISTS `users` (
  `users_id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table prodavnica.users: ~3 rows (approximately)
INSERT INTO `users` (`users_id`, `first_name`, `last_name`, `email`, `password`) VALUES
	(1, 'Petar', 'Jankovic', 'dule2299@gmail.com', '$2a$12$/BzDmn9FSGj6NLODelSwDu8.rJdHpLLOdxWdxKQmMWUWmVsVYGiBq'),
	(2, 'Marko', 'Markovic', 'marko123@gmail.com', '$2a$12$3AMSoPMf8pQGsCsVEKi1NuPx2Bf8veP7HICYHQorQTO.TJVuRJCqS'),
	(3, 'Aleksa', 'Milosevic', 'aleksa@gmail.com', '$2a$10$znnm4/bNBur6298sIh6JeerZUaTgEo7ec2LhW8jC2ciLo8ZPGKwRC');

-- Dumping structure for table prodavnica.user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` int unsigned NOT NULL,
  `role_id` int unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`roles_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table prodavnica.user_roles: ~3 rows (approximately)
INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
	(1, 1),
	(2, 2),
	(3, 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
