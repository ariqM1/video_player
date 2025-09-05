import json
import random

def get_random_duration():
    """Generate realistic movie duration in hours and minutes."""
    hours = random.choice([1, 2])
    minutes = random.randint(0, 59)
    if hours == 1 and minutes < 30:
        minutes = random.randint(30, 59)
    return f"{hours}h {minutes}m"

def map_genre_to_category(genres):
    """Map movie genres to one of 5 categories."""
    category_mapping = {
        'Action': 'Action',
        'Adventure': 'Action', 
        'Thriller': 'Action',
        'Crime': 'Action',
        'War': 'Action',
        'Western': 'Action',
        
        'Comedy': 'Comedy',
        'Family': 'Comedy',
        'Animation': 'Comedy',
        'Musical': 'Comedy',
        
        'Drama': 'Drama',
        'Biography': 'Drama',
        'History': 'Drama',
        'Sport': 'Drama',
        
        'Science Fiction': 'Sci-Fi',
        'Fantasy': 'Sci-Fi',
        'Horror': 'Sci-Fi',
        'Mystery': 'Sci-Fi',
        'Supernatural': 'Sci-Fi',
        
        'Romance': 'Romance',
        'Romantic Comedy': 'Romance',
    }
    
    for genre in genres:
        if genre in category_mapping:
            return category_mapping[genre]
    
    # Default to Drama if no match found
    return 'Drama'

def transform_movies():
    # Load movies data
    with open('/Users/ariqmukul/Downloads/Projects/video_player/backend/data/movies.json', 'r') as f:
        movies = json.load(f)
    
    # Group movies by category
    categories = {'Action': [], 'Comedy': [], 'Drama': [], 'Sci-Fi': [], 'Romance': []}
    
    for movie in movies:
        category = map_genre_to_category(movie['genres'])
        if len(categories[category]) < 20:
            categories[category].append(movie)
    
    # Fill categories if needed by redistributing
    for category in categories:
        while len(categories[category]) < 20:
            for other_category in categories:
                if len(categories[other_category]) > 20:
                    categories[category].append(categories[other_category].pop())
                    break
            else:
                # If all categories have exactly 20, add from remaining movies
                remaining_movies = [m for m in movies if not any(m in cat for cat in categories.values())]
                if remaining_movies:
                    categories[category].append(remaining_movies.pop(0))
                else:
                    break
    
    # Transform to target format
    transformed_movies = []
    movie_id = 1
    
    for category, movie_list in categories.items():
        for movie in movie_list[:20]:  # Ensure exactly 20 per category
            transformed_movie = {
                "id": str(movie_id),
                "title": movie['title'],
                "description": movie['extract'],
                "duration": get_random_duration(),
                "category": category,
                "thumbnail": movie['thumbnail'],
                "year": movie['year'],
                "cast": movie['cast']
            }
            transformed_movies.append(transformed_movie)
            movie_id += 1
    
    # Write transformed data
    with open('/Users/ariqmukul/Downloads/Projects/video_player/backend/data/movies_transformed.json', 'w') as f:
        json.dump(transformed_movies, f, indent=2)
    
    print(f"Transformed {len(transformed_movies)} movies")
    print(f"Categories distribution:")
    category_counts = {}
    for movie in transformed_movies:
        category = movie['category']
        category_counts[category] = category_counts.get(category, 0) + 1
    
    for category, count in category_counts.items():
        print(f"  {category}: {count} movies")

if __name__ == "__main__":
    transform_movies()