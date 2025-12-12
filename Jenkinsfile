pipeline {
    agent any

    environment {
        IMAGE_NAME = "playwright-tests"
        CONTAINER_NAME = "pw-container"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Run Tests in Docker') {
            steps {
                sh """
                docker run --name ${CONTAINER_NAME} \
                -v \$PWD/test-results:/app/test-results \
                ${IMAGE_NAME}
                """
            }
        }

        stage('Archive Test Reports') {
            steps {
                junit 'test-results/**/*.xml'
                archiveArtifacts artifacts: 'test-results/**/*', fingerprint: true
            }
        }
    }

    post {
        always {
            sh "docker rm -f ${CONTAINER_NAME} || true"
        }
    }
}
