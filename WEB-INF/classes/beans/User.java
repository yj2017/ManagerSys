package beans;
public class User{
    private int id;//用户唯一编号
    private String name;
    private String pwd;
    private int role_id;
    private boolean sex;
    private int age;
    public int getId(){return id;}
    public void setId(int id){this.id=id;}
    public String getName(){return name;}
    public void setName(String name){this.name=name;}
    public String getPwd(){return pwd;}
    public void setPwd(String pwd){this.pwd=pwd;}
    public int getRole_id(){return role_id;}
    public void setRole_id(int role_id){this.role_id=role_id;}
    public boolean getSex(){return sex;}
    public void setSex(boolean sex){this.sex=sex;}
    public int getAge(){return age;}
    public void setAge(int age){this.age=age;
    public User(){
        // role_id=0;
        // sex=true;
        // age=18;
    }
    }