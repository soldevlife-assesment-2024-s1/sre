resource "aws_mq_broker" "soldevlife" {
  broker_name         = "soldevlife"
  engine_type         = "RabbitMQ"
  engine_version      = "3.13"
  host_instance_type  = "mq.m5.large"
  publicly_accessible = true
  auto_minor_version_upgrade = true
  deployment_mode     = "SINGLE_INSTANCE"
  subnet_ids          = [aws_subnet.public_ap_southeast_1a.id]
  # security_groups     = [aws_security_group.soldevlife.id]
  tags = {
    App = "soldevlife"
  }

  user {
    username = "example_user"
    password = "example_password"
  }
}
