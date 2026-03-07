# Static Webpage Deployment using Docker and Kubernetes

This project demonstrates **end-to-end deployment of a simple static webpage** using:

- **Docker** for containerization
- **Docker Compose** for container management
- **Kubernetes (Minikube)** for container orchestration

> Normally, static websites are deployed on platforms like **Vercel**, **Render**, etc.  
> However, this project deploys the static site in **Kubernetes** purely for learning and practice purposes.

---

# Project Structure

```
end-to-end/
└── static-page-end-to-end/
    ├── Dockerfile
    ├── docker-compose.yml
    ├── index.html (or other html file)
    └── nginx.conf (optional)
```

---

# 1. Build and Run using Docker

Navigate to the project directory:

```bash
cd end-to-end/static-page-end-to-end
```

Build the Docker image:

```bash
docker build -t static-page .
```

Run the container:

```bash
docker run -d -p 1212:80 static-page
```

Now the container is running and you can access the webpage at:

```
http://localhost:1212
```

---

# Important Note

If your HTML file is **not named `index.html`**, Nginx will display the **default Nginx welcome page**.

To fix this, we need to create a custom **Nginx configuration file**.

## Create `nginx.conf`

```nginx
server {
    listen       80;
    listen       [::]:80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  file-name.html;
    }
}
```

Replace `file-name.html` with the name of your HTML file.

## Update Dockerfile

Add the following line to overwrite the default Nginx configuration:

```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

After rebuilding the Docker image and running the container, the correct webpage will be served.

---

# 2. Using Docker Compose

Run the following command:

```bash
docker compose up --build
```

Once the container starts, you can access the application at:

```
http://localhost:1212
```

---

# 3. Deploying to Kubernetes using Minikube

## Start Minikube

```bash
minikube start
```

---

## Load Docker Image into Minikube

Since this project is for **practice purposes**, the image is **not pushed to a Docker registry**.

Instead, we load the locally built image into Minikube:

```bash
minikube image load static-page:latest
```

---

## Create Pod

Create a file named **`pod.yml`**.

In the pod specification:

- The `image` specified in `spec` refers to the Docker image.
- `imagePullPolicy: Never` is used so that Kubernetes **does not attempt to pull the image from a remote registry**.

Create the pod:

```bash
kubectl create -f pod.yml
```

---

## Check Pod Details

To view the pods along with their IP addresses:

```bash
kubectl get pods -o wide
```

---

## Access the Pod

SSH into the Minikube environment:

```bash
minikube ssh
```

Use `curl` with the pod IP address:

```bash
curl http://<pod-ip-address>:80
```

If the HTML content is displayed, the pod has been successfully deployed.

---

# Using deployment in k8s

## Create deployment

Create a deployment.yml

```bash
kubectl apply -f deployment.yml
```

## Check Deployment Details

To get deployments

```bash
kubectl get deployments
```

To get complete details of deployment

```bash
kubectl describe deployment static-page-deployment
```

By deployment the replica set and pods are created 
- Replica set manages the pod
- Even if the pod gets deleted the deployment get restarted automatically

To check this 

```bash
kubectl get pods -w
```

This command shows the real time logs of the status of pods 

Get the pod

```bash
kubectl get pods 
```

Now delete the pod

```bash
kubectl delete pod <pod_name>
```

Now you could see in the terminal the pod gets deleted and k8s automaticall creates it again as per replica set

This is called as **Auto Healing** in kubernetes


To delete the deployment

```bash
kubectl delete deployment static-page-deployment
```

To stop minikube 

```bash
minikube stop
```

---
# Conclusion

In this project we successfully:

- Containerized a static webpage using **Docker**
- Managed containers using **Docker Compose**
- Deployed the container as a **Pod in Kubernetes using Minikube**
- Deployed the container as a **Deployment in Kubernetes using Minikube**

---