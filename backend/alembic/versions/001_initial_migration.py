"""initial migration

Revision ID: 001
Revises:
Create Date: 2024-01-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create perfumes table
    op.create_table(
        'perfumes',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('brand', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('image', sa.String(), nullable=False),
        sa.Column('rating_avg', sa.Float(), nullable=True, server_default='0.0'),
        sa.Column('votes', sa.Integer(), nullable=True, server_default='0'),
        sa.Column('notes_top', postgresql.ARRAY(sa.String()), nullable=False),
        sa.Column('notes_middle', postgresql.ARRAY(sa.String()), nullable=False),
        sa.Column('notes_base', postgresql.ARRAY(sa.String()), nullable=False),
        sa.Column('gender', sa.String(), nullable=False),
        sa.Column('season', postgresql.ARRAY(sa.String()), nullable=False),
        sa.Column('popularity_score', sa.Integer(), nullable=True, server_default='0'),
        sa.Column('release_year', sa.Integer(), nullable=False),
        sa.Column('longevity', sa.Integer(), nullable=True, server_default='50'),
        sa.Column('sillage', sa.Integer(), nullable=True, server_default='50'),
        sa.Column('accords', postgresql.ARRAY(sa.String()), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # Create indexes
    op.create_index(op.f('ix_perfumes_id'), 'perfumes', ['id'], unique=False)
    op.create_index(op.f('ix_perfumes_brand'), 'perfumes', ['brand'], unique=False)
    op.create_index(op.f('ix_perfumes_name'), 'perfumes', ['name'], unique=False)


def downgrade() -> None:
    # Drop indexes
    op.drop_index(op.f('ix_perfumes_name'), table_name='perfumes')
    op.drop_index(op.f('ix_perfumes_brand'), table_name='perfumes')
    op.drop_index(op.f('ix_perfumes_id'), table_name='perfumes')

    # Drop table
    op.drop_table('perfumes')
