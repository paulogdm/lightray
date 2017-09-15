USE [Bacchus]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 9/15/2017 3:44:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[DepartmentID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[ComputingID] [nvarchar](20) NOT NULL,
	[RowStamp] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Division]    Script Date: 9/15/2017 3:44:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Division](
	[DivisionID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[DepartmentID] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[ComputingID] [nvarchar](20) NOT NULL,
	[RowStamp] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Division] PRIMARY KEY CLUSTERED 
(
	[DivisionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Resource]    Script Date: 9/15/2017 3:44:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Resource](
	[ResourceID] [int] IDENTITY(1,1) NOT NULL,
	[NameFirst] [nvarchar](200) NOT NULL,
	[NameLast] [nvarchar](200) NOT NULL,
	[NamePreferred] [nvarchar](200) NULL,
	[PrimaryEmail] [nvarchar](200) NOT NULL,
	[PrimaryPhone] [nvarchar](50) NOT NULL,
	[Title] [nvarchar](200) NULL,
	[Description] [nvarchar](max) NULL,
	[DateStart] [datetime] NOT NULL,
	[DateEnd] [datetime] NULL,
	[ResourceComputingID] [nvarchar](20) NOT NULL,
	[ParentResourceID] [int] NULL,
	[DivisionID] [int] NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[DateModified] [datetime] NOT NULL,
	[ComputingID] [nvarchar](20) NOT NULL,
	[RowStamp] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Resource] PRIMARY KEY CLUSTERED 
(
	[ResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_DateCreated]  DEFAULT (getdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_DateModified]  DEFAULT (getdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Department] ADD  CONSTRAINT [DF_Department_RowStamp]  DEFAULT (newid()) FOR [RowStamp]
GO
ALTER TABLE [dbo].[Division] ADD  CONSTRAINT [DF_Division_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Division] ADD  CONSTRAINT [DF_Division_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Division] ADD  CONSTRAINT [DF_Division_DateCreated]  DEFAULT (getdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Division] ADD  CONSTRAINT [DF_Division_DateModified]  DEFAULT (getdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Division] ADD  CONSTRAINT [DF_Division_RowStamp]  DEFAULT (newid()) FOR [RowStamp]
GO
ALTER TABLE [dbo].[Resource] ADD  CONSTRAINT [DF_Resource_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Resource] ADD  CONSTRAINT [DF_Resource_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Resource] ADD  CONSTRAINT [DF_Resource_DateCreated]  DEFAULT (getdate()) FOR [DateCreated]
GO
ALTER TABLE [dbo].[Resource] ADD  CONSTRAINT [DF_Resource_DateModified]  DEFAULT (getdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[Resource] ADD  CONSTRAINT [DF_Resource_RowStamp]  DEFAULT (newid()) FOR [RowStamp]
GO
ALTER TABLE [dbo].[Division]  WITH CHECK ADD  CONSTRAINT [FK_Division_Department] FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Department] ([DepartmentID])
GO
ALTER TABLE [dbo].[Division] CHECK CONSTRAINT [FK_Division_Department]
GO
ALTER TABLE [dbo].[Resource]  WITH CHECK ADD  CONSTRAINT [FK_Resource_Division] FOREIGN KEY([DivisionID])
REFERENCES [dbo].[Division] ([DivisionID])
GO
ALTER TABLE [dbo].[Resource] CHECK CONSTRAINT [FK_Resource_Division]
GO
