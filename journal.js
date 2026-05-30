function filtrer(filtre, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
 
  const cards = document.querySelectorAll('.incident-card');
  let count = 0;
 
  cards.forEach(card => {
    const gravite = card.dataset.gravite;
    const statut = card.dataset.statut;
    const visible =
      filtre === 'tous' ||
      filtre === gravite ||
      filtre === statut;
 
    card.style.display = visible ? 'grid' : 'none';
    if (visible) count++;
  });
 
  document.getElementById('count').textContent = count;
}