apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: moj-prototype-${BRANCH}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prototype-${BRANCH}
  template:
    metadata:
      labels:
        app: prototype-${BRANCH}
    spec:
      containers:
      - name: prototype
        image: ${REGISTRY}/${REPOSITORY}:${IMAGE_TAG}
        env:
          - name: USERNAME
            valueFrom:
              secretKeyRef:
                name: basic-auth
                key: username
          - name: PASSWORD
            valueFrom:
              secretKeyRef:
                name: basic-auth
                key: password
        ports:
        - containerPort: 3000
        volumeMounts:
        - name: "data"
          mountPath: "/"
        securityContext:
          runAsNonRoot: true
          runAsUser: 1000
          runAsGroup: 1000
        resources:
          requests:
            memory: 512Mi
          limits:
            memory: 1G
  volumeClaimTemplates:
  - metadata:
      name: moj-prototype-${BRANCH}
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "gp2-expand" # StorageClass name used to create PV
      resources:
        requests:
          storage: 4Gi # Storage resource request size    

---
apiVersion: v1
kind: Service
metadata:
  name: prototype-service-${BRANCH}
  labels:
    app: prototype-service-${BRANCH}
spec:
  ports:
  - port: 3000
    name: http
    targetPort: 3000
  clusterIP: None
  selector:
    app: prototype-${BRANCH}
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: prototype-ingress-${BRANCH}
  annotations:
    external-dns.alpha.kubernetes.io/set-identifier: prototype-ingress-${BRANCH}-${KUBE_NAMESPACE}-green
    external-dns.alpha.kubernetes.io/aws-weight: "100"
spec:
  ingressClassName: default
  tls:
  - hosts:
    - ${KUBE_NAMESPACE}-${BRANCH}.apps.live.cloud-platform.service.justice.gov.uk
  rules:
  - host: ${KUBE_NAMESPACE}-${BRANCH}.apps.live.cloud-platform.service.justice.gov.uk
    http:
      paths:
      - path: /
        pathType: ImplementationSpecific
        backend:
          service:
            name: prototype-service-${BRANCH}
            port:
              number: 3000
