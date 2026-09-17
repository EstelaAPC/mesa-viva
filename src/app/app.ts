import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly search = signal('');
  protected readonly activeCategory = signal('Todos');
  protected readonly favorites = signal<string[]>(['Risoto de cogumelos']);
  protected readonly planned = signal<string[]>(['Shakshuka de domingo']);
  protected readonly categories = ['Todos', 'Rapido', 'Vegetariano', 'Conforto'];
  protected readonly recipes = [
    { name: 'Risoto de cogumelos', category: 'Conforto', time: '35 min', color: 'mushroom', emoji: '🍄', description: 'Cremoso, perfumado e feito para cozinhar sem pressa.' },
    { name: 'Shakshuka de domingo', category: 'Vegetariano', time: '25 min', color: 'shakshuka', emoji: '🍳', description: 'Ovos em molho de tomate, ervas e um toque picante.' },
    { name: 'Massa verde com limao', category: 'Rapido', time: '20 min', color: 'pasta', emoji: '🍋', description: 'Fresca, vibrante e pronta antes da fome virar urgencia.' },
    { name: 'Bolo de azeite e laranja', category: 'Conforto', time: '55 min', color: 'cake', emoji: '🍊', description: 'Miolo macio para acompanhar tardes demoradas.' },
  ];
  protected readonly filteredRecipes = computed(() => {
    const search = this.search().toLowerCase().trim();
    const category = this.activeCategory();
    return this.recipes.filter((recipe) => (category === 'Todos' || recipe.category === category) && recipe.name.toLowerCase().includes(search));
  });

  protected setCategory(category: string) { this.activeCategory.set(category); }
  protected toggleFavorite(name: string) { this.favorites.update((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]); }
  protected togglePlan(name: string) { this.planned.update((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]); }
}
