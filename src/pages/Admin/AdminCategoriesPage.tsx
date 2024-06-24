const AdminCategoriesPage = () => {
    return (
        <>
            <p className="text-2xl font-semibold text-gray-900">Catérories</p>
            <table className="table-auto">
                <thead>
                    <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td>Malcolm Lockyer</td>
                    <td>1961</td>
                    </tr>
                    <tr>
                    <td>Witchy Woman</td>
                    <td>The Eagles</td>
                    <td>1972</td>
                    </tr>
                    <tr>
                    <td>Shining Star</td>
                    <td>Earth, Wind, and Fire</td>
                    <td>1975</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default AdminCategoriesPage;