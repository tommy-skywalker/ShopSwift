import Foundation

struct User: Identifiable, Codable {
    let id: UUID
    let email: String
    let name: String
    var address: String?
    var phoneNumber: String?
    
    init(id: UUID = UUID(), email: String, name: String, address: String? = nil, phoneNumber: String? = nil) {
        self.id = id
        self.email = email
        self.name = name
        self.address = address
        self.phoneNumber = phoneNumber
    }
}

