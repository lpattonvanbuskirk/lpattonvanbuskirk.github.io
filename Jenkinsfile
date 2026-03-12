pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build artwork index') {
            steps {
                sh '''
                ART_DIR="assets/artworks"
                OUTPUT="index.json"

                echo "[" > $OUTPUT

                for dir in $ART_DIR/*; do
                    title=$(cat "$dir/title.txt")
                    desc=$(cat "$dir/desc.txt")
                    date=$(cat "$dir/date.txt")

                    image=$(ls "$dir" | grep -E '\.(png|jpg|jpeg|gif)$' | head -n 1)
                    image_path="$dir/$image"

                    echo "{
                        \\"title\\": \\"$title\\",
                        \\"description\\": \\"$desc\\",
                        \\"date\\": \\"$date\\",
                        \\"image\\": \\"$image_path\\"
                    }," >> $OUTPUT
                done

                # remove trailing comma
                sed -i '$ s/,$//' $OUTPUT

                echo "]" >> $OUTPUT
                '''
            }
        }

        stage('Commit changes') {
            steps {
                sh '''
                git config user.name "jenkins"
                git config user.email "jenkins@local"

                git add index.json
                git commit -m "Auto update artwork index" || echo "No changes"
                git push
                '''
            }
        }
    }
}