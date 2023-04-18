export function toggleActive(target:EventTarget | null)
{
    let activeRows = document.querySelectorAll('.active');
  
    for (let i = 0; i < activeRows.length; i++) {
        activeRows[i].classList.remove('active');
    }
    if (target != null)
    {
        target.parentElement.classList.add('active');
    }
}