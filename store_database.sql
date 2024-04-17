-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2024 at 06:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `store_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_name` varchar(40) NOT NULL,
  `product_id` int(9) NOT NULL,
  `stock` int(5) NOT NULL,
  `supplier_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Adding in a test tuple to table `products`
--

INSERT INTO `products` (`product_name`, `product_id`, `stock`, `supplier_id`) VALUES
('Sample product_name', 123456789, 150, 999);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(9) NOT NULL,
  `customer_id` int(7) NOT NULL,
  `customer_name` varchar(40) NOT NULL,
  `purchase_amount` int(5) NOT NULL,
  `product_id` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Adding in a test tuple to table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `customer_id`, `customer_name`, `purchase_amount`, `product_id`) VALUES
(914790605, 1234567, 'Sample Customer', 50, 123456789);


--
-- Indexes for table `products`, change product_id to primary key 
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);
COMMIT;


