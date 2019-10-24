
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 10/23/2019 11:38:44
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

IF OBJECT_ID(N'[dbo].[FK_CompletedDaily_ToTable]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[completedDaily] DROP CONSTRAINT [FK_CompletedDaily_ToTable];
GO
IF OBJECT_ID(N'[dbo].[FK_daily_ToTable]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[daily] DROP CONSTRAINT [FK_daily_ToTable];
GO
IF OBJECT_ID(N'[dbo].[FK_Other_ToTable]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[other] DROP CONSTRAINT [FK_Other_ToTable];
GO
IF OBJECT_ID(N'[dbo].[FK_otherCategory_ToTable]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[otherCategory] DROP CONSTRAINT [FK_otherCategory_ToTable];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[completedDaily]', 'U') IS NOT NULL
    DROP TABLE [dbo].[completedDaily];
GO
IF OBJECT_ID(N'[dbo].[daily]', 'U') IS NOT NULL
    DROP TABLE [dbo].[daily];
GO
IF OBJECT_ID(N'[dbo].[other]', 'U') IS NOT NULL
    DROP TABLE [dbo].[other];
GO
IF OBJECT_ID(N'[dbo].[otherCategory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[otherCategory];
GO
IF OBJECT_ID(N'[dbo].[sessions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[sessions];
GO
IF OBJECT_ID(N'[dbo].[trueFalseArr]', 'U') IS NOT NULL
    DROP TABLE [dbo].[trueFalseArr];
GO
IF OBJECT_ID(N'[dbo].[users]', 'U') IS NOT NULL
    DROP TABLE [dbo].[users];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'other'
CREATE TABLE [dbo].[other] (
    [Id] varchar(50)  NOT NULL,
    [userEmail] varchar(100)  NOT NULL,
    [title] varchar(200)  NOT NULL,
    [snippit] varchar(200)  NOT NULL,
    [startDate] datetime  NOT NULL,
    [endDate] datetime  NOT NULL,
    [isCompleted] bit  NOT NULL,
    [categoryID] varchar(50)  NOT NULL
);
GO

-- Creating table 'sessions'
CREATE TABLE [dbo].[sessions] (
    [sessionID] varchar(50)  NOT NULL,
    [userEmail] varchar(100)  NOT NULL,
    [issued] datetime  NOT NULL
);
GO

-- Creating table 'users'
CREATE TABLE [dbo].[users] (
    [Email] varchar(100)  NOT NULL,
    [Username] varchar(100)  NOT NULL,
    [Password] varchar(100)  NOT NULL
);
GO

-- Creating table 'completedDailies'
CREATE TABLE [dbo].[completedDailies] (
    [Id] varchar(50)  NOT NULL,
    [userEmail] varchar(100)  NOT NULL,
    [title] varchar(200)  NOT NULL,
    [snippit] varchar(200)  NOT NULL,
    [startDate] datetime  NOT NULL,
    [endDate] datetime  NOT NULL,
    [daysChecked] datetime  NOT NULL,
    [percentComplete] int  NOT NULL
);
GO

-- Creating table 'dailies'
CREATE TABLE [dbo].[dailies] (
    [Id] varchar(50)  NOT NULL,
    [userEmail] varchar(100)  NOT NULL,
    [title] varchar(200)  NOT NULL,
    [snippit] varchar(200)  NOT NULL,
    [startDate] datetime  NOT NULL,
    [endDate] datetime  NOT NULL,
    [daysChecked] datetime  NOT NULL,
    [lastDayUpdated] datetime  NOT NULL,
    [trueFalseArr] int  NOT NULL
);
GO

-- Creating table 'otherCategories'
CREATE TABLE [dbo].[otherCategories] (
    [id] varchar(50)  NOT NULL,
    [userEmail] varchar(100)  NOT NULL,
    [name] varchar(200)  NOT NULL
);
GO

-- Creating table 'trueFalseArrs'
CREATE TABLE [dbo].[trueFalseArrs] (
    [id] int  NOT NULL,
    [C0] bit  NOT NULL,
    [C1] bit  NOT NULL,
    [C2] bit  NOT NULL,
    [C3] bit  NOT NULL,
    [C4] bit  NOT NULL,
    [C5] bit  NOT NULL,
    [C6] bit  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'other'
ALTER TABLE [dbo].[other]
ADD CONSTRAINT [PK_other]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [sessionID] in table 'sessions'
ALTER TABLE [dbo].[sessions]
ADD CONSTRAINT [PK_sessions]
    PRIMARY KEY CLUSTERED ([sessionID] ASC);
GO

-- Creating primary key on [Email] in table 'users'
ALTER TABLE [dbo].[users]
ADD CONSTRAINT [PK_users]
    PRIMARY KEY CLUSTERED ([Email] ASC);
GO

-- Creating primary key on [Id] in table 'completedDailies'
ALTER TABLE [dbo].[completedDailies]
ADD CONSTRAINT [PK_completedDailies]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'dailies'
ALTER TABLE [dbo].[dailies]
ADD CONSTRAINT [PK_dailies]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [id] in table 'otherCategories'
ALTER TABLE [dbo].[otherCategories]
ADD CONSTRAINT [PK_otherCategories]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- Creating primary key on [id] in table 'trueFalseArrs'
ALTER TABLE [dbo].[trueFalseArrs]
ADD CONSTRAINT [PK_trueFalseArrs]
    PRIMARY KEY CLUSTERED ([id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [userEmail] in table 'completedDailies'
ALTER TABLE [dbo].[completedDailies]
ADD CONSTRAINT [FK_CompletedDaily_ToTable1]
    FOREIGN KEY ([userEmail])
    REFERENCES [dbo].[users]
        ([Email])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CompletedDaily_ToTable1'
CREATE INDEX [IX_FK_CompletedDaily_ToTable1]
ON [dbo].[completedDailies]
    ([userEmail]);
GO

-- Creating foreign key on [userEmail] in table 'dailies'
ALTER TABLE [dbo].[dailies]
ADD CONSTRAINT [FK_daily_ToTable1]
    FOREIGN KEY ([userEmail])
    REFERENCES [dbo].[users]
        ([Email])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_daily_ToTable1'
CREATE INDEX [IX_FK_daily_ToTable1]
ON [dbo].[dailies]
    ([userEmail]);
GO

-- Creating foreign key on [categoryID] in table 'other'
ALTER TABLE [dbo].[other]
ADD CONSTRAINT [FK_Other_ToTable1]
    FOREIGN KEY ([categoryID])
    REFERENCES [dbo].[otherCategories]
        ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Other_ToTable1'
CREATE INDEX [IX_FK_Other_ToTable1]
ON [dbo].[other]
    ([categoryID]);
GO

-- Creating foreign key on [userEmail] in table 'otherCategories'
ALTER TABLE [dbo].[otherCategories]
ADD CONSTRAINT [FK_otherCategory_ToTable1]
    FOREIGN KEY ([userEmail])
    REFERENCES [dbo].[users]
        ([Email])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_otherCategory_ToTable1'
CREATE INDEX [IX_FK_otherCategory_ToTable1]
ON [dbo].[otherCategories]
    ([userEmail]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------