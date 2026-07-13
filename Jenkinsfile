pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22'
    }

    environment {
    USER_EMAIL = credentials('playwright-user-email')
    USER_PASSWORD = credentials('playwright-user-password')
    SEARCH_REQUEST = 'gloves'
    PRODUCT_NAME = 'Combination Pliers'
    INVALID_EMAIL = 'wrong@email.com'
    INVALID_PASSWORD = 'wrongpassword'
}

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run UI tests') {
            steps {
                bat 'npm test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*',
                allowEmptyArchive: true
        }
    }
}