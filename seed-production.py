"""
Seed PRODUCTION database (Render PostgreSQL) with initial perfume data
"""
import sys
from pathlib import Path

# Add backend to path
sys.path.append(str(Path(__file__).parent / "backend"))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.perfume import Perfume
from app.db.session import Base

# Production database URL
PRODUCTION_DATABASE_URL = "postgresql://arman_user:dwNYglIlqrPrXEWwto4mA98pfHOJxBO7@dpg-d2f2teodl3ps73eepdr0-a.oregon-postgres.render.com/arman_travel"

# Perfume data with real images
PERFUMES_DATA = [
    {
        "id": "p001",
        "brand": "Maison Lumière",
        "name": "Soleil d'Orient",
        "description": "Una fragancia luminosa que captura la esencia del amanecer mediterráneo con notas cítricas brillantes y un corazón floral elegante.",
        "image": "https://fimgs.net/mdimg/perfume-thumbs/375x500.75805.avif",
        "rating_avg": 4.5,
        "votes": 342,
        "notes_top": ["bergamota", "naranja sanguina", "pomelo"],
        "notes_middle": ["jazmín", "neroli", "rosa"],
        "notes_base": ["ámbar", "almizcle blanco", "madera de cedro"],
        "gender": "unisex",
        "season": ["spring", "summer"],
        "popularity_score": 95,
        "release_year": 2023,
        "longevity": 85,
        "sillage": 70,
        "accords": ["cítrico", "floral", "ambarado"],
    },
    {
        "id": "p002",
        "brand": "Noir Élégance",
        "name": "Velours Noir",
        "description": "Sofisticación absoluta en un frasco. Una mezcla opulenta de especias orientales y maderas preciosas que evoca el lujo de la noche parisina.",
        "image": "https://fimgs.net/mdimg/perfume-thumbs/375x500.81642.avif",
        "rating_avg": 4.8,
        "votes": 521,
        "notes_top": ["cardamomo", "pimienta rosa", "bergamota"],
        "notes_middle": ["iris", "violeta", "rosa turca"],
        "notes_base": ["oud", "pachulí", "vainilla"],
        "gender": "unisex",
        "season": ["fall", "winter"],
        "popularity_score": 98,
        "release_year": 2022,
        "longevity": 95,
        "sillage": 90,
        "accords": ["oriental", "amaderado", "especiado"],
    },
    {
        "id": "p003",
        "brand": "Aqua Vitae",
        "name": "Marine Breeze",
        "description": "Frescura oceánica con un toque de sofisticación. Perfecto para el día a día, evoca la brisa marina con notas acuáticas y cítricas.",
        "image": "https://fimgs.net/mdimg/perfume-thumbs/375x500.62615.avif",
        "rating_avg": 4.2,
        "votes": 287,
        "notes_top": ["limón", "menta acuática", "sal marina"],
        "notes_middle": ["lavanda", "geranio", "salvia"],
        "notes_base": ["almizcle", "ámbar gris", "madera deriva"],
        "gender": "male",
        "season": ["spring", "summer"],
        "popularity_score": 78,
        "release_year": 2023,
        "longevity": 65,
        "sillage": 55,
        "accords": ["acuático", "aromático", "fresco"],
    },
    {
        "id": "p004",
        "brand": "Rose Impériale",
        "name": "Éclat de Rose",
        "description": "La quintaesencia de la rosa en su máxima expresión. Romántico y femenino, pero con carácter y presencia inolvidable.",
        "image": "https://fimgs.net/mdimg/perfume-thumbs/375x500.52802.avif",
        "rating_avg": 4.6,
        "votes": 412,
        "notes_top": ["rosa damascena", "lichi", "pera"],
        "notes_middle": ["rosa de mayo", "peonía", "magnolia"],
        "notes_base": ["almizcle", "madera de sándalo", "vainilla"],
        "gender": "female",
        "season": ["spring", "fall"],
        "popularity_score": 89,
        "release_year": 2021,
        "longevity": 80,
        "sillage": 75,
        "accords": ["floral", "rosa", "frutal"],
    },
    {
        "id": "p005",
        "brand": "Bois Sauvage",
        "name": "Forêt Mystique",
        "description": "Adentrarse en un bosque milenario al amanecer. Notas verdes y amaderadas que evocan la naturaleza en su estado más puro.",
        "image": "https://fimgs.net/mdimg/perfume-thumbs/375x500.61856.avif",
        "rating_avg": 4.4,
        "votes": 298,
        "notes_top": ["hojas de violeta", "menta verde", "cypress"],
        "notes_middle": ["cedro", "vetiver", "musgo de roble"],
        "notes_base": ["pachulí", "ámbar", "cuero"],
        "gender": "male",
        "season": ["fall", "winter"],
        "popularity_score": 82,
        "release_year": 2022,
        "longevity": 88,
        "sillage": 80,
        "accords": ["verde", "amaderado", "terroso"],
    },
]


def seed_production_database():
    """Seed production database with initial data"""
    print("🌱 Starting PRODUCTION database seed...")
    print(f"📍 Database: arman_travel (Render PostgreSQL)")
    print()

    try:
        # Create engine
        print("🔗 Connecting to production database...")
        engine = create_engine(
            PRODUCTION_DATABASE_URL,
            pool_pre_ping=True,
            pool_size=5,
            max_overflow=10,
        )

        # Create session
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        db = SessionLocal()

        # Check if perfumes already exist
        existing_count = db.query(Perfume).count()

        if existing_count > 0:
            print(f"⚠️  Database already contains {existing_count} perfumes")
            response = input("Do you want to clear and reseed? (yes/no): ")

            if response.lower() == "yes":
                print("🗑️  Clearing existing data...")
                db.query(Perfume).delete()
                db.commit()
            else:
                print("✅ Keeping existing data")
                return

        # Insert perfumes
        print(f"📝 Inserting {len(PERFUMES_DATA)} perfumes...")

        for i, perfume_data in enumerate(PERFUMES_DATA, 1):
            perfume = Perfume(**perfume_data)
            db.add(perfume)
            print(f"  [{i}/{len(PERFUMES_DATA)}] Added: {perfume_data['brand']} - {perfume_data['name']}")

        db.commit()

        print()
        print(f"✅ Successfully seeded PRODUCTION database with {len(PERFUMES_DATA)} perfumes!")
        print()
        print("🎉 Production database is ready!")

    except Exception as e:
        print()
        print(f"❌ Error seeding production database: {e}")
        print()
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    print("=" * 60)
    print("  SEED PRODUCTION DATABASE - Render PostgreSQL")
    print("=" * 60)
    print()

    response = input("⚠️  This will modify PRODUCTION data. Continue? (yes/no): ")

    if response.lower() == "yes":
        print()
        seed_production_database()
    else:
        print("❌ Cancelled by user")
