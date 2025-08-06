import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const nextPage = 'next';
    const prevPage = 'prev';
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1)
      return this._generateMarkupButton(curPage + 1, nextPage);

    // Last page
    if (curPage === numPages && numPages > 1)
      return this._generateMarkupButton(curPage - 1, prevPage);

    // Other page
    if (curPage < numPages)
      return `${this._generateMarkupButton(
        curPage - 1,
        prevPage
      )} ${this._generateMarkupButton(curPage + 1, nextPage)}`;

    // Page 1, and there are No other pages
    return '';
  }

  _generateMarkupButton(curPage, btnState) {
    const isPrev = btnState === 'prev';

    return `
      <button data-goto="${curPage}" class="btn--inline pagination__btn--${btnState}">
        ${
          isPrev
            ? `
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage}</span>
        `
            : `
          <span>Page ${curPage}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        `
        }
      </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }
}

export default new PaginationView();
