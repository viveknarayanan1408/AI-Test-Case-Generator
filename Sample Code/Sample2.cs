public class UserService
{
    public bool IsValidUsername(string username)
    {
        if (string.IsNullOrEmpty(username))
            return false;

        if (username.Length < 5 || username.Length > 15)
            return false;

        if (!username.All(char.IsLetterOrDigit))
            return false;

        return true;
    }
}