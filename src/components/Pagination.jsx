// src/Components/Pagination.jsx
const Pagination = ({ currentPage, totalPages, goToPage }) => (
  <div className="flex justify-center gap-2 py-4">
    <button className="btn btn-sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
      Prev
    </button>
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => goToPage(i + 1)}
        className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : ''}`}
      >
        {i + 1}
      </button>
    ))}
    <button className="btn btn-sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
      Next
    </button>
  </div>
);

export default Pagination;
