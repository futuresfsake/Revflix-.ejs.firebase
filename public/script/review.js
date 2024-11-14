document.addEventListener('DOMContentLoaded', () => {
    const reviewList = document.getElementById('reviewList');
    const reviewForm = document.getElementById('reviewForm');
    const reviewIdField = document.getElementById('reviewId');
    const movieNameField = document.getElementById('movieName');
    const reviewTextField = document.getElementById('reviewText');
    const submitButton = document.querySelector('.submit-button');
    const cancelButton = document.getElementById('cancelReviewBtn');

    // Handle delete and edit buttons in the review list
    reviewList.addEventListener('click', async (event) => {
        const reviewItem = event.target.closest('.review-item');
        const reviewId = reviewItem.getAttribute('data-id');

        if (event.target.classList.contains('delete-button')) {
            // Handle delete button click
            try {
                const response = await fetch(`/review/${reviewId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    reviewItem.remove();
                } else {
                    console.error('Error deleting review');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else if (event.target.classList.contains('edit-button')) {
            // Handle edit button click
            const movieName = reviewItem.querySelector('.movie-name').textContent;
            const reviewText = reviewItem.querySelector('.review-text').textContent;

            // Populate form fields with existing review data
            movieNameField.value = movieName;
            reviewTextField.value = reviewText;
            reviewIdField.value = reviewId;

            // Change submit button text to "Update Review"
            submitButton.textContent = 'Update Review';
        }
    });

    // Handle form submission for adding/updating reviews
    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const reviewId = reviewIdField.value;
        const movieName = movieNameField.value;
        const reviewText = reviewTextField.value;

        if (reviewId) {
            // Handle update review
            try {
                console.log('Updating review:', { reviewId, movieName, reviewText }); // Debugging line
                const response = await fetch(`/review/${reviewId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ movieName, reviewText })
                });

                if (response.ok) {
                    console.log('Review updated successfully'); // Debugging line
                    window.location.reload();
                } else {
                    console.error('Error updating review');
                    console.log('Response status:', response.status); // Debugging line
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // Handle create review
            reviewForm.submit();
        }
    });

    // Handle cancel button click
    cancelButton.addEventListener('click', () => {
        // Clear form fields
        movieNameField.value = '';
        reviewTextField.value = '';
        reviewIdField.value = '';

        // Reset submit button text to "Submit Review"
        submitButton.textContent = 'Submit Review';
    });
});
