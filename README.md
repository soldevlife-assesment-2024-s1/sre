# sre

## AWS Profile Setup

```bash
aws configure --profile terraform
aws sts get-caller-identity --profile terraform
```

## Terraform

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## EKS Kubeconfig

```bash
aws eks --region ap-southeast-1 update-kubeconfig --name soldevlife --profile terraform
```

## Deploy App

```bash
kubectl apply -f app/app.yml
```

## Check Deployment

```bash
kubectl get deployments
kubectl get pods
kubectl get svc -o wide
kubectl get ingress
```

## Get Credentials

RDS endpoints:
```bash
terraform state show aws_db_instance.soldevlife-user-service | grep -E "endpoint|username|password"
terraform state show aws_db_instance.soldevlife-ticket-service | grep -E "endpoint|username|password"
terraform state show aws_db_instance.soldevlife-booking-service | grep -E "endpoint|username|password"
terraform state show aws_db_instance.soldevlife-recommendation-service | grep -E "endpoint|username|password"
```

MQ (RabbitMQ):
```bash
terraform state show aws_mq_broker.soldevlife | grep -E "console_url|endpoints|instances"
```

ElastiCache (Redis):
```bash
terraform state show aws_elasticache_cluster.soldevlife | grep -E "cache_nodes|configuration_endpoint"
```

## Custom Domain (Cloudflare)

Arahkan ELB endpoint ke custom domain via Cloudflare:

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pilih domain → **DNS** → **Records** → **Add Record**
3. Isi:
   - **Type**: `CNAME`
   - **Name**: subdomain yang diinginkan (misal `app`)
   - **Target**: ELB endpoint dari `kubectl get svc -o wide`
   - **Proxy status**: Proxied (orange cloud) untuk CDN + SSL, atau DNS only (grey cloud) untuk direct
4. Save

Untuk HTTPS, set **SSL/TLS** mode di Cloudflare ke **Flexible** atau **Full**.

### Cloudflare vs Route 53

| | Cloudflare | Route 53 |
|---|---|---|
| Harga | Free tier (DNS, CDN, SSL, DDoS) | $0.50/bulan per hosted zone + per query |
| CDN/WAF | Built-in gratis | Perlu CloudFront + AWS WAF (bayar) |
| DNS Routing | Basic | Advanced (latency, geolocation, failover) |
| AWS Integration | Manual | Native (Alias record, health check) |
| Best for | Hemat + butuh CDN/security gratis | Full AWS stack + advanced routing |

### Custom Domain via Route 53 (Terraform)

Buat file `route53.tf`:

```hcl
resource "aws_route53_zone" "main" {
  name = "domainmu.com"
}

resource "aws_route53_record" "app" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "app.domainmu.com"
  type    = "CNAME"
  ttl     = 300
  records = ["<ELB_ENDPOINT>"]
}
```

Lalu apply:
```bash
terraform apply
```

> **Note:** Kalau domain dibeli di luar AWS, update nameserver di registrar domain ke NS yang diberikan Route 53 di hosted zone.
