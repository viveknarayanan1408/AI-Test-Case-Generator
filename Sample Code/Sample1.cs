public class OrderService
{
    public decimal CalculateDiscount(decimal orderAmount, int customerLoyaltyPoints, bool isFirstOrder)
    {
        if (orderAmount <= 0)
        {
            throw new ArgumentException("Order amount must be greater than zero");
        }

        decimal discount = 0;

        // Base discount
        if (orderAmount > 100)
        {
            discount += orderAmount * 0.10m;
        }

        // Loyalty bonus
        if (customerLoyaltyPoints > 500)
        {
            discount += 20;
        }

        // First order bonus
        if (isFirstOrder)
        {
            discount += 15;
        }

        // Cap discount
        if (discount > 100)
        {
            discount = 100;
        }

        return discount;
    }
}