# 🛡️Svalinn — Adaptive DDoS Attack Map & Defense System
### Final Project fro my branch— Cyber Warfare Division

---

## 🎯 PROJECT BRIEF

### Core Thesis
> A real-time geospatial DDoS attack visualization and autonomous defense platform powered by adaptive machine learning that detects, classifies, and neutralizes both known and zero-day DDoS attack patterns without human intervention.

---

## 📋 FEATURE BREAKDOWN

### MODULE 1 — Real-Time 3D Attack Globe
```
- Interactive 3D globe (WebGL) showing live attack arcs
- Source IP → Target IP geo-traced trajectories
- Color-coded by attack type (SYN Flood=Red, UDP=Orange, HTTP=Yellow, etc.)
- Attack intensity heatmaps on target regions
- Timeline scrubber to replay historical attacks
- Zoom into country/city level granularity
```

### MODULE 2 — Traffic Ingestion & Deep Packet Analysis
```
- High-throughput packet capture engine (100K+ pps)
- Protocol dissection (TCP/UDP/ICMP/HTTP/DNS/NTP)
- Flow-based analysis (NetFlow/sFlow/IPFIX format)
- Header anomaly detection (malformed packets, TTL analysis)
- Payload entropy analysis (encrypted vs plaintext flood detection)
- Traffic baselining per source/destination/protocol
- Simulated traffic generator for testing (built-in)
```

### MODULE 3 — Adaptive ML Detection Engine (THE CORE)
```
Layer 1 — Signature-Based (Known Attacks):
  • Pre-trained classifiers for 15+ DDoS types
  • SYN Flood, UDP Flood, DNS Amplification, NTP Reflection
  • Slowloris, RUDY, HTTP GET/POST Flood
  • Memcached Amplification, SSDP, CHARGEN
  • GRE Flood, ACK Flood, SYN-ACK Flood
  • TCP Fragment, ICMP Flood, DNS Water Torture

Layer 2 — Anomaly-Based (Unknown/Zero-Day):
  • Autoencoder neural network for "normal traffic" profiling
  • Reconstruction error threshold = attack detection
  • Isolation Forest for multivariate outlier detection
  • DBSCAN clustering for new pattern grouping

Layer 3 — Online Adaptive Learning:
  • River/Online-ML for continuous model updating
  • Concept drift detection (ADWIN algorithm)
  • Self-labeling pipeline with confidence scoring
  • Feedback loop: neutralized attack → retrain → evolve
  • Zero-shot classification for never-seen patterns

Layer 4 — Behavioral Fingerprinting:
  • Per-IP behavioral profiles (request cadence, entropy, geo)
  • Bot vs Human classification (mouse entropy, JS challenge)
  • Botnet coordination detection (synchronized timing analysis)
  • IP reputation scoring (dynamic, not static blacklists)
```

### MODULE 4 — Autonomous Neutralization Engine
```
Response Tier 1 — Soft (Confidence < 70%):
  • Rate limiting suspicious IPs
  • CAPTCHA/JS challenge injection
  • TCP SYN cookies activation
  • Traffic deprioritization (QoS marking)

Response Tier 2 — Medium (Confidence 70-90%):
  • Geo-based traffic filtering
  • BGP blackhole routing (simulated)
  • Connection reset for malicious flows
  • DNS sinkholing for C2 domains

Response Tier 3 — Hard (Confidence > 90%):
  • Full IP/subnet blocking (with auto-expiry)
  • Upstream scrubbing center activation (simulated)
  • Traffic diversion to honeypot for intelligence
  • Alert escalation + forensic packet capture

Auto-Whitelist Protection:
  • Legitimate traffic fingerprinting
  • False positive detection and auto-correction
  • Critical service protection lists
```

### MODULE 5 — War Room Dashboard
```
- Real-time metrics: pps, bps, flow count, unique IPs
- Attack classification breakdown (pie/bar charts)
- Top attacking countries/ASNs/IPs
- Defense action log with timestamps
- Model confidence gauges
- System health monitors (CPU/RAM/Queue depth)
- Alert feed with severity levels (CRITICAL/HIGH/MED/LOW)
- ROC/Precision-Recall curves for model performance
- PDF/CSV report generation
```

### MODULE 6 — Attack Simulation Lab
```
- Built-in traffic generators for all 15+ attack types
- Custom attack pattern designer (define your own vectors)
- "Red Team vs Blue Team" mode
- Blended attack scenarios (multi-vector simultaneous)
- Gradual ramp-up attacks (low-and-slow testing)
- Model stress testing framework
```

### MODULE 7 — Threat Intelligence Module
```
- IP reputation database (local + API integration ready)
- Known botnet IP feeds ingestion
- ASN risk scoring
- Attack pattern knowledge base (MITRE ATT&CK mapped)
- Post-attack forensic analysis reports
- Attack DNA — unique fingerprint for each detected pattern
```

---

## 🏗️ TECH STACK

```
Frontend:    React 18 + TypeScript + Globe.gl (3D) + D3.js + TailwindCSS
Backend:     Python 3.11 + FastAPI + WebSockets
ML Engine:   PyTorch + Scikit-learn + River (Online ML)
Streaming:   Apache Kafka (traffic ingestion pipeline)
Database:    PostgreSQL + TimescaleDB (time-series) + Redis (cache/realtime)
Packet:      Scapy (packet crafting/analysis) + dpkt
DevOps:      Docker + Docker Compose
Monitoring:  Prometheus + Grafana (system metrics)
```

---

## 📁 FILE STRUCTURE

```
aegis/
│
├── README.md
├── LICENSE
├── docker-compose.yml
├── .env.example
├── .gitignore
├── Makefile
├── docs/
│   ├── architecture.md
│   ├── thesis-paper.md
│   ├── api-reference.md
│   ├── ml-model-docs.md
│   ├── attack-taxonomy.md
│   └── diagrams/
│       ├── system-architecture.png
│       ├── ml-pipeline-flow.png
│       ├── data-flow.png
│       └── defense-decision-tree.png
│
├── ========================================
│   FRONTEND (React + TypeScript)
│   ========================================
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── index.html
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── textures/
│   │   │   ├── earth-blue-marble.jpg
│   │   │   ├── earth-topology.png
│   │   │   ├── earth-night.jpg
│   │   │   └── earth-clouds.png
│   │   └── data/
│   │       ├── countries-geo.json
│   │       ├── cities-geo.json
│   │       └── ip-geo-sample.json
│   │
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── vite-env.d.ts
│       │
│       ├── assets/
│       │   ├── fonts/
│       │   └── icons/
│       │
│       ├── styles/
│       │   ├── globals.css
│       │   ├── dashboard.css
│       │   └── attack-map.css
│       │
│       ├── config/
│       │   ├── constants.ts
│       │   ├── attackTypes.ts
│       │   └── apiEndpoints.ts
│       │
│       ├── types/
│       │   ├── attack.ts
│       │   ├── traffic.ts
│       │   ├── defense.ts
│       │   ├── geoData.ts
│       │   ├── metrics.ts
│       │   └── websocket.ts
│       │
│       ├── hooks/
│       │   ├── useWebSocket.ts
│       │   ├── useAttackData.ts
│       │   ├── useGlobeControls.ts
│       │   ├── useMetrics.ts
│       │   ├── useDefenseActions.ts
│       │   └── useTimeline.ts
│       │
│       ├── services/
│       │   ├── api.ts
│       │   ├── websocketService.ts
│       │   ├── geoLocationService.ts
│       │   ├── attackService.ts
│       │   ├── defenseService.ts
│       │   └── reportService.ts
│       │
│       ├── store/
│       │   ├── index.ts
│       │   ├── attackSlice.ts
│       │   ├── metricsSlice.ts
│       │   ├── defenseSlice.ts
│       │   ├── mapSlice.ts
│       │   └── settingsSlice.ts
│       │
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Header.tsx
│       │   │   ├── Sidebar.tsx
│       │   │   ├── Footer.tsx
│       │   │   └── MainLayout.tsx
│       │   │
│       │   ├── globe/
│       │   │   ├── AttackGlobe.tsx          # Main 3D globe
│       │   │   ├── GlobeContainer.tsx
│       │   │   ├── AttackArc.tsx            # Animated arc between src→dst
│       │   │   ├── AttackPoint.tsx           # Pulsing point on source/target
│       │   │   ├── HeatmapLayer.tsx         # Intensity heatmap overlay
│       │   │   ├── GlobeControls.tsx        # Zoom/rotate/pan controls
│       │   │   ├── GlobeTooltip.tsx         # Hover info popup
│       │   │   ├── CountryHighlight.tsx     # Country border highlight
│       │   │   └── GlobeLegend.tsx          # Color legend
│       │   │
│       │   ├── dashboard/
│       │   │   ├── MetricsPanel.tsx         # pps, bps, flow counts
│       │   │   ├── AttackTypeChart.tsx      # Pie chart of attack types
│       │   │   ├── TrafficGraph.tsx         # Time-series line graph
│       │   │   ├── TopAttackers.tsx         # Leaderboard of attacking IPs
│       │   │   ├── TopTargets.tsx           # Most targeted IPs/services
│       │   │   ├── GeoDistribution.tsx      # Choropleth map
│       │   │   ├── AlertFeed.tsx            # Real-time alert stream
│       │   │   ├── SystemHealth.tsx         # CPU/RAM/Queue monitors
│       │   │   └── ModelConfidence.tsx      # ML model confidence gauge
│       │   │
│       │   ├── defense/
│       │   │   ├── DefensePanel.tsx         # Active defense overview
│       │   │   ├── ActionLog.tsx            # Timeline of defense actions
│       │   │   ├── BlockedIPsTable.tsx      # Currently blocked IPs
│       │   │   ├── RateLimitStatus.tsx      # Rate limiting status
│       │   │   ├── DefenseControls.tsx      # Manual override controls
│       │   │   └── MitigationStrategy.tsx   # Current strategy display
│       │   │
│       │   ├── analysis/
│       │   │   ├── PacketInspector.tsx      # Deep packet analysis view
│       │   │   ├── FlowAnalysis.tsx         # Network flow breakdown
│       │   │   ├── AnomalyTimeline.tsx      # Anomaly detection timeline
│       │   │   ├── AttackDNA.tsx            # Unique attack fingerprint viz
│       │   │   ├── ModelPerformance.tsx     # ROC/PR curves
│       │   │   └── PatternExplorer.tsx      # Explore detected patterns
│       │   │
│       │   ├── simulation/
│       │   │   ├── AttackSimulator.tsx      # Launch simulated attacks
│       │   │   ├── ScenarioBuilder.tsx      # Build custom scenarios
│       │   │   ├── TrafficGenerator.tsx     # Generate test traffic
│       │   │   └── RedVsBlue.tsx            # Red team vs Blue team mode
│       │   │
│       │   ├── intelligence/
│       │   │   ├── ThreatFeed.tsx           # Threat intelligence feed
│       │   │   ├── IPReputation.tsx         # IP reputation lookup
│       │   │   ├── BotnetTracker.tsx        # Known botnet tracking
│       │   │   └── AttackKnowledgeBase.tsx  # MITRE ATT&CK mapping
│       │   │
│       │   ├── reports/
│       │   │   ├── ReportGenerator.tsx      # Generate PDF/CSV reports
│       │   │   ├── ForensicReport.tsx       # Post-attack forensics
│       │   │   └── HistoricalAnalysis.tsx   # Historical attack analysis
│       │   │
│       │   └── common/
│       │       ├── LoadingSpinner.tsx
│       │       ├── ErrorBoundary.tsx
│       │       ├── Badge.tsx
│       │       ├── Card.tsx
│       │       ├── Modal.tsx
│       │       ├── Tooltip.tsx
│       │       ├── StatusIndicator.tsx
│       │       └── SeverityBadge.tsx
│       │
│       ├── pages/
│       │   ├── AttackMapPage.tsx
│       │   ├── DashboardPage.tsx
│       │   ├── DefensePage.tsx
│       │   ├── AnalysisPage.tsx
│       │   ├── SimulationPage.tsx
│       │   ├── IntelligencePage.tsx
│       │   ├── ReportsPage.tsx
│       │   └── SettingsPage.tsx
│       │
│       └── utils/
│           ├── formatters.ts
│           ├── colorScales.ts
│           ├── geoUtils.ts
│           ├── dateUtils.ts
│           └── validators.ts
│
├── ========================================
│   BACKEND (FastAPI + Python)
│   ========================================
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── pyproject.toml
│   ├── alembic.ini
│   │
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                          # FastAPI app entry
│   │   ├── config.py                        # Settings / env vars
│   │   ├── dependencies.py                  # Dependency injection
│   │   │
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── v1/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── router.py                # Main API router
│   │   │   │   │
│   │   │   │   ├── endpoints/
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   ├── attacks.py           # Attack data endpoints
│   │   │   │   │   ├── traffic.py           # Traffic analysis endpoints
│   │   │   │   │   ├── defense.py           # Defense action endpoints
│   │   │   │   │   ├── metrics.py           # System metrics endpoints
│   │   │   │   │   ├── simulation.py        # Attack simulation endpoints
│   │   │   │   │   ├── intelligence.py      # Threat intel endpoints
│   │   │   │   │   ├── models.py            # ML model management
│   │   │   │   │   ├── reports.py           # Report generation
│   │   │   │   │   └── geo.py               # Geolocation endpoints
│   │   │   │   │
│   │   │   │   └── schemas/
│   │   │   │       ├── __init__.py
│   │   │   │       ├── attack.py
│   │   │   │       ├── traffic.py
│   │   │   │       ├── defense.py
│   │   │   │       ├── metrics.py
│   │   │   │       ├── simulation.py
│   │   │   │       └── intelligence.py
│   │   │   │
│   │   │   └── websockets/
│   │   │       ├── __init__.py
│   │   │       ├── manager.py               # WebSocket connection manager
│   │   │       ├── attack_feed.py           # Live attack data stream
│   │   │       ├── metrics_feed.py          # Live metrics stream
│   │   │       └── defense_feed.py          # Live defense actions stream
│   │   │
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── security.py                  # Auth / API keys
│   │   │   ├── events.py                    # Startup/shutdown events
│   │   │   ├── middleware.py                # CORS, rate limiting
│   │   │   └── exceptions.py               # Custom exceptions
│   │   │
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── attack_event.py              # Attack event ORM model
│   │   │   ├── traffic_flow.py              # Traffic flow ORM model
│   │   │   ├── defense_action.py            # Defense action ORM model
│   │   │   ├── blocked_ip.py               # Blocked IP ORM model
│   │   │   ├── ip_reputation.py            # IP reputation ORM model
│   │   │   ├── attack_pattern.py           # Detected pattern ORM model
│   │   │   └── alert.py                     # Alert ORM model
│   │   │
│   │   ├── db/
│   │   │   ├── __init__.py
│   │   │   ├── session.py                   # DB session factory
│   │   │   ├── base.py                      # SQLAlchemy base
│   │   │   └── migrations/
│   │   │       └── versions/
│   │   │           └── 001_initial.py
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── attack_service.py            # Attack event logic
│   │   │   ├── traffic_service.py           # Traffic processing logic
│   │   │   ├── defense_service.py           # Defense orchestration
│   │   │   ├── geo_service.py               # IP → Geolocation mapping
│   │   │   ├── reputation_service.py        # IP reputation scoring
│   │   │   ├── alert_service.py             # Alert generation/routing
│   │   │   ├── report_service.py            # Report generation
│   │   │   └── simulation_service.py        # Attack simulation orchestration
│   │   │
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── ip_utils.py
│   │       ├── packet_utils.py
│   │       ├── time_utils.py
│   │       └── math_utils.py
│   │
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py
│   │   ├── test_api/
│   │   │   ├── test_attacks.py
│   │   │   ├── test_defense.py
│   │   │   └── test_simulation.py
│   │   ├── test_services/
│   │   │   ├── test_attack_service.py
│   │   │   └── test_defense_service.py
│   │   └── test_integration/
│   │       └── test_full_pipeline.py
│   │
│   └── scripts/
│       ├── seed_geo_data.py
│       ├── seed_reputation_data.py
│       └── init_db.py
│
├── ========================================
│   ML ENGINE (PyTorch + Scikit-learn + River)
│   ========================================
├── ml_engine/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── __init__.py
│   ├── config.py
│   │
│   ├── data/
│   │   ├── __init__.py
│   │   ├── preprocessor.py                  # Feature extraction pipeline
│   │   ├── feature_engineer.py              # 40+ traffic features
│   │   ├── normalizer.py                    # Data normalization
│   │   ├── windowing.py                     # Time-window aggregation
│   │   └── datasets/
│   │       ├── README.md
│   │       ├── cicddos2019_loader.py        # CIC-DDoS2019 dataset loader
│   │       ├── caida_loader.py              # CAIDA dataset loader
│   │       └── synthetic_generator.py       # Synthetic attack data gen
│   │
│   ├── features/
│   │   ├── __init__.py
│   │   ├── packet_features.py               # Packet-level features
│   │   │   # - packet_size, ttl, protocol, flags
│   │   │   # - header_length, payload_length
│   │   │   # - entropy_src_port, entropy_dst_port
│   │   ├── flow_features.py                 # Flow-level features
│   │   │   # - duration, packet_count, byte_count
│   │   │   # - packets_per_second, bytes_per_second
│   │   │   # - fwd_pkt_count, bwd_pkt_count
│   │   │   # - flow_iat_mean, flow_iat_std
│   │   ├── statistical_features.py          # Statistical features
│   │   │   # - rolling_mean, rolling_std, rolling_entropy
│   │   │   # - hurst_exponent, autocorrelation
│   │   │   # - burst_ratio, periodicity_score
│   │   ├── behavioral_features.py           # Behavioral features
│   │   │   # - unique_dst_ips, unique_dst_ports
│   │   │   # - connection_rate, failed_connection_ratio
│   │   │   # - payload_diversity, protocol_distribution
│   │   └── temporal_features.py             # Time-based features
│   │       # - time_of_day, day_of_week
│   │       # - traffic_trend, seasonality_component
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   │
│   │   ├── signature/                        # LAYER 1: Known attacks
│   │   │   ├── __init__.py
│   │   │   ├── random_forest.py             # RF classifier
│   │   │   ├── xgboost_classifier.py        # XGBoost classifier
│   │   │   ├── attack_signatures.py         # Signature database
│   │   │   └── ensemble.py                  # Voting ensemble
│   │   │
│   │   ├── anomaly/                          # LAYER 2: Unknown attacks
│   │   │   ├── __init__.py
│   │   │   ├── autoencoder.py               # PyTorch Autoencoder
│   │   │   ├── variational_ae.py            # Variational Autoencoder
│   │   │   ├── isolation_forest.py          # Isolation Forest
│   │   │   ├── dbscan_cluster.py            # DBSCAN clustering
│   │   │   ├── one_class_svm.py             # One-Class SVM
│   │   │   └── threshold_manager.py         # Dynamic thresholding
│   │   │
│   │   ├── adaptive/                         # LAYER 3: Online learning
│   │   │   ├── __init__.py
│   │   │   ├── online_classifier.py         # River online classifier
│   │   │   ├── drift_detector.py            # ADWIN concept drift
│   │   │   ├── incremental_learner.py       # Incremental model update
│   │   │   ├── self_labeler.py              # Self-labeling pipeline
│   │   │   └── evolution_tracker.py         # Track model evolution
│   │   │
│   │   ├── behavioral/                       # LAYER 4: Behavioral
│   │   │   ├── __init__.py
│   │   │   ├── ip_profiler.py               # Per-IP behavior profiling
│   │   │   ├── bot_detector.py              # Bot vs Human classifier
│   │   │   ├── botnet_detector.py           # Coordinated attack detection
│   │   │   └── reputation_scorer.py         # Dynamic IP reputation
│   │   │
│   │   └── meta/                             # META: Model orchestration
│   │       ├── __init__.py
│   │       ├── model_orchestrator.py        # Routes traffic → right model
│   │       ├── confidence_aggregator.py     # Combines all model outputs
│   │       ├── decision_engine.py           # Final attack/benign decision
│   │       └── model_registry.py            # Model versioning & loading
│   │
│   ├── training/
│   │   ├── __init__.py
│   │   ├── train_signature.py               # Train signature models
│   │   ├── train_autoencoder.py             # Train autoencoder
│   │   ├── train_ensemble.py                # Train full ensemble
│   │   ├── evaluate.py                      # Model evaluation metrics
│   │   ├── hyperparameter_search.py         # Optuna hyperparameter tuning
│   │   └── cross_validate.py               # K-fold cross validation
│   │
│   ├── inference/
│   │   ├── __init__.py
│   │   ├── pipeline.py                      # Full inference pipeline
│   │   ├── realtime_classifier.py           # Real-time classification
│   │   ├── batch_classifier.py             # Batch classification
│   │   └── attack_fingerprinter.py         # Generate attack DNA
│   │
│   ├── defense/
│   │   ├── __init__.py
│   │   ├── strategy_selector.py             # Select defense strategy
│   │   ├── rate_limiter.py                  # Rate limiting logic
│   │   ├── ip_blocker.py                    # IP blocking logic
│   │   ├── traffic_diverter.py              # Traffic diversion logic
│   │   ├── challenge_issuer.py              # CAPTCHA/JS challenge
│   │   ├── bgp_blackhole.py                 # BGP blackhole (simulated)
│   │   ├── scrubbing_center.py              # Scrubbing center (simulated)
│   │   └── whitelist_protector.py           # Legitimate traffic protection
│   │
│   ├── saved_models/
│   │   ├── .gitkeep
│   │   ├── signature_rf_v1.pkl
│   │   ├── signature_xgb_v1.pkl
│   │   ├── autoencoder_v1.pt
│   │   ├── vae_v1.pt
│   │   ├── isolation_forest_v1.pkl
│   │   └── online_model_checkpoint.pkl
│   │
│   └── tests/
│       ├── __init__.py
│       ├── test_features.py
│       ├── test_signature_model.py
│       ├── test_anomaly_model.py
│       ├── test_adaptive_model.py
│       ├── test_inference_pipeline.py
│       └── test_defense_strategies.py
│
├── ========================================
│   TRAFFIC ENGINE (Packet Capture & Generation)
│   ========================================
├── traffic_engine/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── __init__.py
│   │
│   ├── capture/
│   │   ├── __init__.py
│   │   ├── packet_capture.py                # Raw packet capture (Scapy)
│   │   ├── flow_collector.py                # NetFlow/sFlow collector
│   │   ├── pcap_reader.py                   # Read .pcap files
│   │   └── protocol_dissector.py            # Protocol breakdown
│   │
│   ├── generator/
│   │   ├── __init__.py
│   │   ├── base_generator.py                # Base traffic generator
│   │   ├── benign_traffic.py                # Normal traffic patterns
│   │   ├── syn_flood.py                     # SYN Flood generator
│   │   ├── udp_flood.py                     # UDP Flood generator
│   │   ├── http_flood.py                    # HTTP GET/POST Flood
│   │   ├── dns_amplification.py             # DNS Amplification
│   │   ├── ntp_reflection.py                # NTP Reflection
│   │   ├── slowloris.py                     # Slowloris generator
│   │   ├── icmp_flood.py                    # ICMP Flood generator
│   │   ├── tcp_fragment.py                  # TCP Fragment attack
│   │   ├── memcached_amplification.py       # Memcached Amplification
│   │   ├── dns_water_torture.py             # DNS Water Torture
│   │   ├── ack_flood.py                     # ACK Flood
│   │   ├── gre_flood.py                     # GRE Flood
│   │   ├── custom_pattern.py                # Custom attack patterns
│   │   └── blended_attack.py               # Multi-vector attacks
│   │
│   ├── analysis/
│   │   ├── __init__.py
│   │   ├── entropy_analyzer.py              # Payload entropy
│   │   ├── header_analyzer.py               # Header anomaly detection
│   │   ├── ttl_analyzer.py                  # TTL analysis
│   │   ├── timing_analyzer.py              # Inter-arrival time analysis
│   │   └── baseline_profiler.py            # Normal traffic baseline
│   │
│   └── kafka/
│       ├── __init__.py
│       ├── producer.py                      # Kafka traffic producer
│       └── consumer.py                      # Kafka traffic consumer
│
├── ========================================
│   INFRASTRUCTURE
│   ========================================
├── infrastructure/
│   ├── docker/
│   │   ├── frontend.Dockerfile
│   │   ├── backend.Dockerfile
│   │   ├── ml_engine.Dockerfile
│   │   ├── traffic_engine.Dockerfile
│   │   └── kafka.Dockerfile
│   │
│   ├── kafka/
│   │   ├── server.properties
│   │   └── topics.sh                        # Create required topics
│   │
│   ├── postgres/
│   │   ├── init.sql                         # Initial schema
│   │   └── timescale-setup.sql              # TimescaleDB hypertables
│   │
│   ├── redis/
│   │   └── redis.conf
│   │
│   ├── prometheus/
│   │   └── prometheus.yml
│   │
│   ├── grafana/
│   │   └── dashboards/
│   │       ├── system-metrics.json
│   │       └── attack-metrics.json
│   │
│   └── nginx/
│       └── nginx.conf
│
├── ========================================
│   DATASETS & GEO DATA
│   ========================================
├── data/
│   ├── geo/
│   │   ├── GeoLite2-City.mmdb               # MaxMind GeoIP database
│   │   ├── asn-database.csv                  # ASN lookup data
│   │   └── country-coords.json              # Country centroids
│   │
│   ├── reputation/
│   │   ├── known-botnets.csv                # Known botnet IPs
│   │   ├── tor-exit-nodes.csv               # Tor exit nodes
│   │   └── threat-feeds.csv                 # Threat intelligence feeds
│   │
│   ├── training/
│   │   ├── README.md                         # Dataset download instructions
│   │   ├── cicddos2019/                     # CIC-DDoS2019 (download)
│   │   ├── caida/                           # CAIDA traces (download)
│   │   └── synthetic/                       # Generated synthetic data
│   │
│   └── pcap_samples/
│       ├── normal_traffic.pcap
│       ├── syn_flood_sample.pcap
│       ├── dns_amp_sample.pcap
│       └── blended_attack_sample.pcap
│
├── ========================================
│   NOTEBOOKS (Research & Experimentation)
│   ========================================
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   ├── 02_feature_engineering.ipynb
│   ├── 03_signature_model_training.ipynb
│   ├── 04_autoencoder_experiments.ipynb
│   ├── 05_online_learning_tests.ipynb
│   ├── 06_concept_drift_analysis.ipynb
│   ├── 07_defense_strategy_evaluation.ipynb
│   ├── 08_zero_day_simulation.ipynb
│   └── 09_full_pipeline_demo.ipynb
│
├── ========================================
│   SCRIPTS & UTILITIES
│   ========================================
└── scripts/
    ├── setup.sh                              # Full environment setup
    ├── start_all.sh                          # Start all services
    ├── stop_all.sh                           # Stop all services
    ├── run_training.sh                       # Train all models
    ├── run_simulation.sh                     # Run attack simulation
    ├── download_datasets.sh                  # Download training data
    ├── download_geo_data.sh                  # Download GeoIP data
    ├── generate_synthetic_data.py            # Generate synthetic attacks
    └── benchmark.py                          # Performance benchmarks
```

---

## 🔄 DATA FLOW ARCHITECTURE

```
                    ┌─────────────────────────────────┐
                    │   TRAFFIC SOURCES                │
                    │  (Real / Simulated / PCAP)       │
                    └──────────────┬──────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────────┐
                    │        KAFKA MESSAGE QUEUE        │
                    │   topic: raw_traffic              │
                    │   topic: processed_flows          │
                    │   topic: attack_events            │
                    │   topic: defense_actions          │
                    └──────────────┬──────────────────┘
                                   │
                    ┌──────────────┴──────────────────┐
                    │                                   │
                    ▼                                   ▼
        ┌───────────────────┐             ┌───────────────────┐
        │  TRAFFIC ENGINE   │             │   ML ENGINE        │
        │                   │             │                    │
        │ • Packet Capture  │────────────▶│ • Feature Extract  │
        │ • Flow Collector  │             │ • Signature Check  │
        │ • Protocol Dissect│             │ • Anomaly Detect   │
        │ • Baseline Profile│             │ • Online Learning  │
        │ • Entropy Analysis│             │ • Behavior Profile │
        └───────────────────┘             │ • Confidence Score │
                                          └────────┬──────────┘
                                                   │
                                    ┌──────────────┴──────────────┐
                                    │      DECISION ENGINE        │
                                    │                             │
                                    │  Confidence > Threshold?    │
                                    │  ┌─YES──┐    ┌──NO──┐      │
                                    │  │ATTACK│    │BENIGN│      │
                                    │  └──┬───┘    └──────┘      │
                                    └─────┼──────────────────────┘
                                          │
                                          ▼
                              ┌───────────────────────┐
                              │  DEFENSE ENGINE        │
                              │                        │
                              │  Tier 1: Rate Limit    │
                              │  Tier 2: Geo Filter    │
                              │  Tier 3: Full Block    │
                              │                        │
                              │  + Whitelist Check     │
                              │  + Auto-expiry         │
                              │  + Feedback → ML       │
                              └───────────┬───────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
                    ▼                     ▼                     ▼
          ┌──────────────┐    ┌──────────────────┐    ┌──────────────┐
          │  PostgreSQL  │    │    Redis Cache    │    │   WebSocket  │
          │  TimescaleDB │    │   (Real-time)     │    │   → Frontend │
          │  (Historical)│    │                   │    │              │
          └──────────────┘    └──────────────────┘    └──────┬───────┘
                                                             │
                                                             ▼
                                                  ┌──────────────────┐
                                                  │  REACT FRONTEND  │
                                                  │                  │
                                                  │  • 3D Globe Map  │
                                                  │  • Dashboard     │
                                                  │  • Defense Panel │
                                                  │  • Simulator     │
                                                  │  • Reports       │
                                                  └──────────────────┘
```

---

## 🚀 QUICKSTART (docker-compose.yml)

```yaml
version: '3.9'

services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    depends_on: [backend]

  backend:
    build: ./backend
    ports: ["8000:8000"]
    depends_on: [postgres, redis, kafka]
    environment:
      - DATABASE_URL=postgresql://aegis:aegis@postgres:5432/aegis
      - REDIS_URL=redis://redis:6379
      - KAFKA_BOOTSTRAP=kafka:9092

  ml_engine:
    build: ./ml_engine
    depends_on: [kafka, redis]
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]   # GPU if available

  traffic_engine:
    build: ./traffic_engine
    depends_on: [kafka]
    network_mode: host              # For packet capture

  postgres:
    image: timescale/timescaledb:latest-pg15
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: aegis
      POSTGRES_USER: aegis
      POSTGRES_PASSWORD: aegis
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./infrastructure/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    ports: ["9092:9092"]
    depends_on: [zookeeper]
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  prometheus:
    image: prom/prometheus
    ports: ["9090:9090"]
    volumes:
      - ./infrastructure/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports: ["3001:3000"]
    depends_on: [prometheus]

volumes:
  pgdata:
```

---

## 📊 KEY METRICS TO SHOWCASE IN THESIS

```
┌────────────────────────────────────────────────┐
│  DETECTION PERFORMANCE                          │
│  • Accuracy on known attacks:     > 99.2%       │
│  • Zero-day detection rate:       > 94%         │
│  • False positive rate:           < 0.5%        │
│  • Detection latency:            < 200ms        │
│  • Adaptation time (new pattern): < 5 minutes   │
│                                                  │
│  SYSTEM PERFORMANCE                              │
│  • Throughput:          100K+ packets/sec        │
│  • End-to-end latency:  < 500ms                 │
│  • Concurrent attacks:   5+ simultaneous         │
│  • Auto-mitigation:      < 2 seconds             │
└────────────────────────────────────────────────┘
```

---

## 🏁 BUILD ORDER (Coding Sequence)

```
Phase 1 → Traffic Engine + Kafka (get data flowing)
Phase 2 → ML Feature Engineering (extract 40+ features)
Phase 3 → Signature Models (train on CIC-DDoS2019)
Phase 4 → Anomaly Models (Autoencoder + Isolation Forest)
Phase 5 → Backend API + WebSockets (serve data)
Phase 6 → Frontend Globe + Dashboard (visualize)
Phase 7 → Defense Engine (auto-mitigation)
Phase 8 → Adaptive Online Learning (concept drift)
Phase 9 → Simulation Lab (red vs blue)
Phase 10 → Integration Testing + Benchmarks
```

**This is a thesis-grade, publication-worthy system. Start with Phase 1 and say "build phase 1" .** 🚀
