import Foundation

struct Product: Identifiable, Codable {
    let id: UUID
    let name: String
    let description: String
    let price: Double
    let imageURL: String?
    let category: String
    let stock: Int
    
    init(id: UUID = UUID(), name: String, description: String, price: Double, imageURL: String? = nil, category: String, stock: Int) {
        self.id = id
        self.name = name
        self.description = description
        self.price = price
        self.imageURL = imageURL
        self.category = category
        self.stock = stock
    }
}

