-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2026 at 10:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bms`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerid` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `registrationdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customerid`, `firstname`, `lastname`, `gender`, `telephone`, `address`, `registrationdate`) VALUES
(1, 'John', 'Doe', 'Male', '0781111111', 'Kigali', '2026-05-27'),
(3, 'MUHIRE', 'Dieudonne', 'Male', '8754987', 'kigali', '2026-05-14');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productcode` int(11) NOT NULL,
  `productname` varchar(150) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `supplier` varchar(150) DEFAULT NULL,
  `addeddate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productcode`, `productname`, `category`, `price`, `quantity`, `supplier`, `addeddate`) VALUES
(1, 'Laptop', 'Electronics', 800000.00, 10, 'TechSupplier Ltd', '2026-05-27'),
(2, 'Phone', 'Electronics', 300000.00, 8, 'Mobile Supplier', '2026-05-27'),
(3, 'mouse', 'computer', 5000.00, 12, 'mucyo', '2026-05-20');

-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

CREATE TABLE `sale` (
  `saleid` int(11) NOT NULL,
  `customerid` int(11) NOT NULL,
  `productcode` int(11) NOT NULL,
  `quantitysold` int(11) NOT NULL,
  `unitprice` decimal(10,2) NOT NULL,
  `totalamount` decimal(10,2) NOT NULL,
  `saledate` date NOT NULL,
  `paymentstatus` enum('Paid','Pending','Unpaid') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sale`
--

INSERT INTO `sale` (`saleid`, `customerid`, `productcode`, `quantitysold`, `unitprice`, `totalamount`, `saledate`, `paymentstatus`) VALUES
(1, 1, 1, 2, 800000.00, 1600000.00, '2026-05-27', 'Paid'),
(3, 3, 2, 12, 300000.00, 3600000.00, '2026-05-22', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `username`, `email`, `password`) VALUES
(1, 'admin', 'admin@gmail.com', '123456'),
(2, 'manager', 'manager@gmail.com', '123456'),
(3, 'muhire', 'muhiredieu7@gmail.com', '$2b$10$9Ve775sRlsi7RRlfWlAtNuL//SeD5wQD1HEgE6iqEDh0CZfz8cHVO'),
(8, 'muhiredieu', 'm@123', '$2b$10$BdTzfb8M8iT76cKTh9SF0O6t8qL3h6.wWezbEiZNGDOKvfva2wW3y'),
(13, 'mddev', 'a@1ef', '$2b$10$.G.lDrH6oELYd.4fbj/IlObXyPKgL0dW1PSf92IB8SntR1k2hlTXy'),
(14, 'mother', 'mother@bvj', '$2b$10$CGkGeY9SN8jpuNNF2Tl7O.Xt5L5tZCiz.jTDk4W0WBdS05UotW/JK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customerid`),
  ADD UNIQUE KEY `telephone` (`telephone`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productcode`);

--
-- Indexes for table `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`saleid`),
  ADD KEY `fk_customer` (`customerid`),
  ADD KEY `fk_product` (`productcode`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productcode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sale`
--
ALTER TABLE `sale`
  MODIFY `saleid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sale`
--
ALTER TABLE `sale`
  ADD CONSTRAINT `fk_customer` FOREIGN KEY (`customerid`) REFERENCES `customer` (`customerid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`productcode`) REFERENCES `product` (`productcode`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
