# Install the official library
pip install openai

# Set your API key (get it from https://platform.openai.com/)
echo "export OPENAI_API_KEY='your-key-here'" >> ~/.bashrc  # Linux/macOS
setx OPENAI_API_KEY "your-key-here"                        # Windows