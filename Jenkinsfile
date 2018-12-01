pipeline {
	agent {
		label "master"
	}

	stages {
		stage('Build') {
			steps {
				sh "docker run --rm --volume \"\$(pwd):\$(pwd)\" --workdir \"\$(pwd)\" --user \$(id -u) node:8.12.0-alpine sh ./scripts/build.sh"
			}
		}
		stage('Release') {
			when {
				anyOf {
					branch 'release'
				}
			}
			steps {
				echo "Releasing…"
			}
		}
	}
}
