
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 10/21/2019 10:24:11
-- Generated from EDMX file: C:\Users\Killian\Desktop\Projects\Goal-Tracker with Login\goal-tracker\GoalTrackerAPI\UserDataAccess\UserDataModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [Users];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[userModels]', 'U') IS NOT NULL
    DROP TABLE [dbo].[userModels];
GO
IF OBJECT_ID(N'[dbo].[sessions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[sessions];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'userModels'
CREATE TABLE [dbo].[userModels] (
    [Email] varchar(100)  NOT NULL,
    [Password] varchar(100)  NOT NULL,
    [Username] varchar(100)  NOT NULL,
    [goals] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'sessions'
CREATE TABLE [dbo].[sessions] (
    [sessionID] varchar(50)  NOT NULL,
    [userEmail] varchar(100)  NOT NULL,
    [issued] datetime  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Email] in table 'userModels'
ALTER TABLE [dbo].[userModels]
ADD CONSTRAINT [PK_userModels]
    PRIMARY KEY CLUSTERED ([Email] ASC);
GO

-- Creating primary key on [sessionID] in table 'sessions'
ALTER TABLE [dbo].[sessions]
ADD CONSTRAINT [PK_sessions]
    PRIMARY KEY CLUSTERED ([sessionID] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------