resource "aws_db_subnet_group" "soldevlife" {
  name        = "soldevlife"
  description = "soldevlife"
  subnet_ids  = [aws_subnet.public_ap_southeast_1a.id, aws_subnet.public_ap_southeast_1b.id]
}

resource "aws_db_instance" "soldevlife-user-service" {
  identifier_prefix    = "soldevlife-user-service"
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "16.6"
  instance_class       = "db.t3.micro"
  username             = "soldevlife"
  password             = "soldevlife"
  parameter_group_name = "default.postgres16"
  publicly_accessible  = true
  skip_final_snapshot  = true
  # vpc_security_group_ids = [aws_security_group.soldevlife.id]
  db_subnet_group_name = aws_db_subnet_group.soldevlife.name

  tags = {
    Name = "soldevlife-user-service"
  }

}

resource "aws_db_instance" "soldevlife-ticket-service" {
  identifier_prefix    = "soldevlife-ticket-service"
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "16.6"
  instance_class       = "db.t3.micro"
  username             = "soldevlife"
  password             = "soldevlife"
  parameter_group_name = "default.postgres16"
  publicly_accessible  = true
  skip_final_snapshot  = true
  # vpc_security_group_ids = [aws_security_group.soldevlife.id]
  db_subnet_group_name = aws_db_subnet_group.soldevlife.name

  tags = {
    Name = "soldevlife-ticket-service"
  }

}

resource "aws_db_instance" "soldevlife-booking-service" {
  identifier_prefix    = "soldevlife-booking-service"
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "16.6"
  instance_class       = "db.t3.micro"
  username             = "soldevlife"
  password             = "soldevlife"
  parameter_group_name = "default.postgres16"
  publicly_accessible  = true
  skip_final_snapshot  = true
  # vpc_security_group_ids = [aws_security_group.soldevlife.id]
  db_subnet_group_name = aws_db_subnet_group.soldevlife.name

  tags = {
    Name = "soldevlife-booking-service"
  }

}

resource "aws_db_instance" "soldevlife-recommendation-service" {
  identifier_prefix    = "soldevlife-recommendation-service"
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "16.6"
  instance_class       = "db.t3.micro"
  username             = "soldevlife"
  password             = "soldevlife"
  parameter_group_name = "default.postgres16"
  publicly_accessible  = true
  skip_final_snapshot  = true
  # vpc_security_group_ids = [aws_security_group.soldevlife.id]
  db_subnet_group_name = aws_db_subnet_group.soldevlife.name

  tags = {
    Name = "soldevlife-recommendation-service"
  }

}

