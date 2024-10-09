const API_URL = 'http://localhost:5000/api/workout';

document.addEventListener('DOMContentLoaded', fetchWorkouts);

document.getElementById('workoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const workoutData = {
        type: document.getElementById('type').value,
        duration: document.getElementById('duration').value,
        intensity: document.getElementById('intensity').value,
        caloriesBurned: document.getElementById('caloriesBurned').value,
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData),
    });

    fetchWorkouts();

    document.getElementById('workoutForm').reset();
});

async function fetchWorkouts() {
    const response = await fetch(API_URL);
    const workouts = await response.json();

    const workoutList = document.getElementById('workoutList');
    let totalCalories = 0;

    let html = workouts.map((workout) => {
        totalCalories += workout.caloriesBurned;

        return `
            <div class="workout-item">
                <strong>Type:</strong> ${workout.type} <br>
                <strong>Duration:</strong> ${workout.duration} mins <br>
                <strong>Intensity:</strong> ${workout.intensity} <br>
                <strong>Calories Burned:</strong> ${workout.caloriesBurned} cal <br>
                <button onclick="deleteWorkout('${workout._id}')">Delete</button>
            </div>
            <hr>
        `;
    }).join(''); 
    

    workoutList.innerHTML = html;

    document.getElementById('totalCalories').textContent = totalCalories + ' Calories';
}

async function deleteWorkout(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    fetchWorkouts();
}




