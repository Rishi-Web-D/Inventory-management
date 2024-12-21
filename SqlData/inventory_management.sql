-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 17, 2024 at 07:51 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'shirt', 'new shirts are available', '2024-12-14 11:12:12', '2024-12-14 11:21:34'),
(2, 'jeans', 'new jeans are available', '2024-12-14 11:17:32', '2024-12-14 11:17:32'),
(3, 'lower', 'new lowers are available', '2024-12-14 11:18:08', '2024-12-14 11:22:12'),
(4, 'tshirt', 'new tshirts are available', '2024-12-14 11:18:23', '2024-12-14 11:22:22');

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`id`, `name`, `email`, `phone`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'Ram Sharma', 'ramsharma@gmail.com', '9898787867', 'E8 , arera colony , Bhopal (M.P.)', '2024-12-16 09:46:24', '2024-12-16 09:46:24'),
(2, 'Avinash Panthi', 'avinashpanthi007@gmail.com', '9630955321', 'JP Nagar , Chola , Bhopal (M.P.)', '2024-12-16 09:50:10', '2024-12-16 09:50:10'),
(3, 'Rishi Sharma', 'rishisharma6265@gmail.com', '9589753034', 'E8 Arera Colony , Bhopal (M.P.)', '2024-12-16 09:51:51', '2024-12-16 09:51:51'),
(4, 'Shashank Sen', 'shashanksen42@gmail.com', '7469034243', '12 Number Arera Colony , Bhopal (M.P.)', '2024-12-16 09:53:26', '2024-12-16 09:53:26');

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE `Employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`id`, `name`, `role`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'Pankaj Batra', 'cashier', 'pankajbatra201@gmail.com', '2024-12-16 10:03:46', '2024-12-16 10:03:46'),
(2, 'Shlok Jain', 'cashier', 'shlokjain202@gmail.com', '2024-12-16 10:04:23', '2024-12-16 10:04:23'),
(3, 'Shiva Gupta', 'cashier', 'shivagupta203@gmail.com', '2024-12-16 10:04:50', '2024-12-16 10:04:50'),
(4, 'Prince Bhatt', 'cashier', 'princebhatt204@gmail.com', '2024-12-16 10:05:17', '2024-12-16 10:06:16');

-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE TABLE `Invoices` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `invoice_date` datetime NOT NULL,
  `amount_paid` decimal(10,2) NOT NULL,
  `payment_status` varchar(50) NOT NULL DEFAULT 'Pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Invoices`
--

INSERT INTO `Invoices` (`id`, `order_id`, `invoice_date`, `amount_paid`, `payment_status`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2024-12-25 00:00:00', 320.00, 'success', '2024-12-16 10:31:59', '2024-12-16 10:31:59'),
(2, 2, '2024-12-01 00:00:00', 445.00, 'success', '2024-12-16 10:32:19', '2024-12-16 10:32:19'),
(3, 6, '2024-12-04 00:00:00', 334.00, 'success', '2024-12-16 10:32:58', '2024-12-16 10:32:58'),
(4, 8, '2024-12-07 00:00:00', 223.00, 'success', '2024-12-16 10:33:16', '2024-12-16 10:33:16'),
(5, 7, '2024-12-06 00:00:00', 654.00, 'failed', '2024-12-16 10:33:54', '2024-12-16 10:34:17'),
(6, 3, '2024-12-02 00:00:00', 224.00, 'failed', '2024-12-16 10:34:57', '2024-12-16 10:34:57'),
(7, 4, '2024-12-04 00:00:00', 356.00, 'failed', '2024-12-16 10:36:22', '2024-12-16 10:36:22'),
(8, 5, '2024-12-04 00:00:00', 556.00, 'failed', '2024-12-16 10:36:38', '2024-12-16 10:36:38');

-- --------------------------------------------------------

--
-- Table structure for table `OrderProducts`
--

CREATE TABLE `OrderProducts` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `OrderProducts`
--

INSERT INTO `OrderProducts` (`id`, `order_id`, `product_id`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 2, '2024-12-16 10:42:12', '2024-12-16 10:42:12'),
(2, 2, 2, 5, '2024-12-16 10:42:23', '2024-12-16 10:42:23'),
(3, 3, 3, 8, '2024-12-16 10:42:32', '2024-12-16 10:42:32'),
(4, 4, 4, 10, '2024-12-16 10:42:40', '2024-12-16 10:42:40'),
(5, 5, 8, 7, '2024-12-16 10:43:01', '2024-12-16 10:43:01'),
(6, 6, 7, 5, '2024-12-16 10:43:11', '2024-12-16 10:43:11'),
(7, 7, 6, 4, '2024-12-16 10:43:21', '2024-12-16 10:43:21'),
(8, 8, 5, 12, '2024-12-16 10:43:29', '2024-12-16 10:43:29');

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`id`, `order_date`, `total_amount`, `customer_id`, `employee_id`, `createdAt`, `updatedAt`) VALUES
(1, '2024-12-25 00:00:00', 320.00, 1, 1, '2024-12-16 10:11:37', '2024-12-16 10:11:37'),
(2, '2024-12-01 00:00:00', 445.00, 2, 1, '2024-12-16 10:11:56', '2024-12-16 10:11:56'),
(3, '2024-12-02 00:00:00', 224.00, 2, 2, '2024-12-16 10:12:14', '2024-12-16 10:12:14'),
(4, '2024-12-04 00:00:00', 356.00, 1, 3, '2024-12-16 10:12:26', '2024-12-16 10:12:26'),
(5, '2024-12-04 00:00:00', 556.00, 1, 4, '2024-12-16 10:12:37', '2024-12-16 10:12:37'),
(6, '2024-12-04 00:00:00', 334.00, 2, 4, '2024-12-16 10:12:45', '2024-12-16 10:12:45'),
(7, '2024-12-06 00:00:00', 654.00, 2, 3, '2024-12-16 10:12:59', '2024-12-16 10:12:59'),
(8, '2024-12-07 00:00:00', 223.00, 2, 3, '2024-12-16 10:13:11', '2024-12-16 10:13:11');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `unit_price` decimal(10,0) DEFAULT NULL,
  `reorder_level` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`id`, `name`, `description`, `unit_price`, `reorder_level`, `category_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Denim Jeans', 'A pair of classic denim jeans with a comfortable fit.', 40, 15, 2, '2024-12-14 11:43:03', '2024-12-14 12:16:35'),
(2, 'Casual Shirt', 'A comfortable casual shirt suitable for everyday wear.', 56, 10, 1, '2024-12-14 11:50:02', '2024-12-14 11:50:02'),
(3, 'Slim Fit Jeans', 'Trendy slim fit jeans with a sleek look.', 50, 20, 2, '2024-12-14 12:17:54', '2024-12-14 12:17:54'),
(4, 'Formal Shirt', 'A stylish formal shirt perfect for office and meetings.', 50, 5, 1, '2024-12-14 12:19:01', '2024-12-14 12:19:01'),
(5, 'Cotton Track Lowers', 'Comfortable cotton track lowers, perfect for gym and casual wear.', 30, 4, 3, '2024-12-14 12:19:56', '2024-12-14 12:19:56'),
(6, 'Sports Performance Lowers', 'Breathable and stretchable lowers designed for high-performance sports.', 36, 12, 3, '2024-12-14 12:20:27', '2024-12-14 12:20:27'),
(7, 'Graphic Printed T-Shirt', 'Trendy t-shirt with high-quality graphic print, made from breathable fabric.', 22, 15, 3, '2024-12-14 12:21:40', '2024-12-14 12:21:40'),
(8, 'Round neck T-Shirt', 'Trendy t-shirt with high-quality graphic print, made from breathable fabric.', 16, 20, 3, '2024-12-14 12:22:23', '2024-12-14 12:22:23');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20241214071409-create-category.js'),
('20241214072050-create-product.js'),
('20241214083117-create-stock-table.js'),
('20241214085048-create-suppliers.js'),
('20241214090901-create-supplier-product.js'),
('20241214091728-create-customers-table.js'),
('20241214092152-create-employees-table.js'),
('20241214092951-create-orders.js'),
('20241214093808-create-invoices-table.js'),
('20241214094127-create-orderproducts-table.js');

-- --------------------------------------------------------

--
-- Table structure for table `Stocks`
--

CREATE TABLE `Stocks` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `warehouse_location` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Stocks`
--

INSERT INTO `Stocks` (`id`, `product_id`, `quantity`, `warehouse_location`, `createdAt`, `updatedAt`) VALUES
(1, 1, 15, 'mandideep', '2024-12-16 07:48:12', '2024-12-16 07:48:12'),
(2, 2, 25, 'sehore', '2024-12-16 07:50:00', '2024-12-16 07:50:00'),
(3, 3, 34, 'itarsi', '2024-12-16 07:50:44', '2024-12-16 07:50:44'),
(4, 4, 31, 'vidisha', '2024-12-16 07:52:01', '2024-12-16 07:52:01'),
(5, 5, 17, 'salamatpur', '2024-12-16 07:53:23', '2024-12-16 07:53:23'),
(6, 6, 22, 'berasia', '2024-12-16 07:53:49', '2024-12-16 07:53:49'),
(7, 7, 25, 'nishatpura', '2024-12-16 07:53:57', '2024-12-16 07:54:56'),
(8, 8, 19, 'dewanganj', '2024-12-16 07:56:12', '2024-12-16 07:56:12');

-- --------------------------------------------------------

--
-- Table structure for table `SupplierProducts`
--

CREATE TABLE `SupplierProducts` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `supply_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `SupplierProducts`
--

INSERT INTO `SupplierProducts` (`id`, `supplier_id`, `product_id`, `price`, `supply_date`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 26, '2024-12-01 00:00:00', '2024-12-16 08:56:50', '2024-12-16 08:56:50'),
(2, 1, 3, 33, '2024-12-02 00:00:00', '2024-12-16 08:57:11', '2024-12-16 08:57:11'),
(3, 2, 2, 36, '2024-12-03 00:00:00', '2024-12-16 08:57:39', '2024-12-16 08:57:39'),
(4, 2, 4, 29, '2024-12-04 00:00:00', '2024-12-16 08:58:01', '2024-12-16 08:58:01'),
(5, 3, 5, 17, '2024-12-05 00:00:00', '2024-12-16 08:58:25', '2024-12-16 08:58:25'),
(6, 3, 6, 19, '2024-12-05 00:00:00', '2024-12-16 08:58:37', '2024-12-16 08:58:37'),
(7, 4, 7, 12, '2024-12-06 00:00:00', '2024-12-16 08:59:08', '2024-12-16 08:59:08'),
(8, 4, 8, 8, '2024-12-07 00:00:00', '2024-12-16 09:01:32', '2024-12-16 09:01:32');

-- --------------------------------------------------------

--
-- Table structure for table `Suppliers`
--

CREATE TABLE `Suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Suppliers`
--

INSERT INTO `Suppliers` (`id`, `name`, `email`, `phone`, `createdAt`, `updatedAt`) VALUES
(1, 'Ramesh Dangi', 'rameshdangi01@gmail.com', '9898787898', '2024-12-16 08:24:36', '2024-12-16 08:24:36'),
(2, 'Mansuk lal', 'mansuk02@gmail.com', '7878969678', '2024-12-16 08:25:57', '2024-12-16 08:25:57'),
(3, 'Jethalal Gada', 'jethalalgada92@gmail.com', '9292363692', '2024-12-16 08:26:50', '2024-12-16 08:26:50'),
(4, 'Abdul Bhai', 'abdulbhai76@gmail.com', '7675746767', '2024-12-16 08:27:39', '2024-12-16 08:27:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `OrderProducts`
--
ALTER TABLE `OrderProducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `Stocks`
--
ALTER TABLE `Stocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `SupplierProducts`
--
ALTER TABLE `SupplierProducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Suppliers`
--
ALTER TABLE `Suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Employees`
--
ALTER TABLE `Employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Invoices`
--
ALTER TABLE `Invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `OrderProducts`
--
ALTER TABLE `OrderProducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Stocks`
--
ALTER TABLE `Stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `SupplierProducts`
--
ALTER TABLE `SupplierProducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Suppliers`
--
ALTER TABLE `Suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `OrderProducts`
--
ALTER TABLE `OrderProducts`
  ADD CONSTRAINT `orderproducts_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderproducts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Stocks`
--
ALTER TABLE `Stocks`
  ADD CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SupplierProducts`
--
ALTER TABLE `SupplierProducts`
  ADD CONSTRAINT `supplierproducts_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `Suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `supplierproducts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
