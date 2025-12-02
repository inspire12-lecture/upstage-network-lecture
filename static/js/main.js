document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const usersList = document.getElementById('usersList');
    
    userForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(userForm);
        const userData = {
            name: formData.get('name'),
            email: formData.get('email')
        };
        
        try {
            showMessage('Creating user...', 'loading');
            
            const response = await fetch('/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                const newUser = await response.json();
                showMessage('User created!', 'success');
                userForm.reset();
                addUserToList(newUser);
            } else {
                showMessage('Failed to create user', 'error');
            }
        } catch (error) {
            showMessage('Network error', 'error');
        }
    });
    
    function addUserToList(user) {
        const li = document.createElement('li');
        li.className = 'user-item';
        li.textContent = `${user.name} (${user.email})`;
        usersList.appendChild(li);
    }
    
    function showMessage(text, type) {
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        
        userForm.parentNode.insertBefore(messageDiv, userForm);
        
        if (type !== 'loading') {
            setTimeout(() => messageDiv.remove(), 3000);
        }
    }
});