import Foundation

struct Order: Identifiable, Codable {
    let id: UUID
    let userId: UUID
    let items: [CartItem]
    let totalAmount: Double
    let status: OrderStatus
    let createdAt: Date
    let shippingAddress: String
    
    enum OrderStatus: String, Codable {
        case pending
        case processing
        case shipped
        case delivered
        case cancelled
    }
    
    init(id: UUID = UUID(), userId: UUID, items: [CartItem], totalAmount: Double, status: OrderStatus = .pending, createdAt: Date = Date(), shippingAddress: String) {
        self.id = id
        self.userId = userId
        self.items = items
        self.totalAmount = totalAmount
        self.status = status
        self.createdAt = createdAt
        self.shippingAddress = shippingAddress
    }
}

